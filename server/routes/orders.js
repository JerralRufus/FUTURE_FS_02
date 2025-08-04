const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/checkout', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { address } = req.body;

    if (!address) {
        return res.status(400).json({ msg: 'Address is required' });
    }

    const client = await db.pool.connect(); 


    try {
        await client.query('BEGIN'); 
        const cartQuery = await client.query('SELECT cart_id FROM carts WHERE user_id = $1', [userId]);
        if (cartQuery.rows.length === 0) {
            throw new Error('Cart not found or is empty.');
        }
        const cartId = cartQuery.rows[0].cart_id;

        const itemsQuery = await client.query('SELECT * FROM cart_items WHERE cart_id = $1', [cartId]);
        if (itemsQuery.rows.length === 0) {
            throw new Error('No items in cart to checkout.');
        }
        const cartItems = itemsQuery.rows;
        const totalPrice = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
        const orderQuery = await client.query(
            'INSERT INTO delivered_orders (user_id, address, total_price) VALUES ($1, $2, $3) RETURNING *',
            [userId, address, totalPrice]
        );
        const newOrder = orderQuery.rows[0];
        const newOrderId = newOrder.delivered_order_id;

        const itemInsertPromises = cartItems.map(item => {
            return client.query(
                'INSERT INTO delivered_order_items (delivered_order_id, product_title, quantity, price, img_url) VALUES ($1, $2, $3, $4, $5)',
                [newOrderId, item.product_title, item.quantity, item.price, item.img_url]
            );
        });
        await Promise.all(itemInsertPromises);
        await client.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
        await client.query('DELETE FROM carts WHERE cart_id = $1', [cartId]);

        await client.query('COMMIT'); 

        const finalOrder = {
            ...newOrder,
            items: cartItems.map(item => ({
                product_title: item.product_title,
                quantity: item.quantity,
                price: item.price,
                img_url: item.img_url,
            })),
        };

        res.status(201).json(finalOrder);

    } catch (err) {
        await client.query('ROLLBACK'); 
        console.error(err.message);
        res.status(500).send('Server Error');
    } finally {
        client.release(); 
    }
});

router.get('/delivered', authMiddleware, async (req, res) => {
    try {
        const ordersQuery = await db.query(
            'SELECT * FROM delivered_orders WHERE user_id = $1 ORDER BY order_date DESC',
            [req.user.id]
        );

        const orders = ordersQuery.rows;

        const fullOrders = await Promise.all(
            orders.map(async (order) => {
                const itemsQuery = await db.query(
                    'SELECT * FROM delivered_order_items WHERE delivered_order_id = $1',
                    [order.delivered_order_id]
                );
                return { ...order, items: itemsQuery.rows };
            })
        );

        res.json(fullOrders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;