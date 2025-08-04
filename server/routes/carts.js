const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const cartQuery = await db.query('SELECT cart_id FROM carts WHERE user_id = $1', [req.user.id]);

    if (cartQuery.rows.length === 0) {
      return res.json([]);
    }
    const cartId = cartQuery.rows[0].cart_id;

    const cartItemsQuery = await db.query('SELECT product_title, quantity, price, img_url FROM cart_items WHERE cart_id = $1 ORDER BY cart_item_id', [cartId]);
    res.json(cartItemsQuery.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/add', authMiddleware, async (req, res) => {
  const { productTitle, price, imgURL } = req.body;
  const userId = req.user.id;

  try {
    let cartQuery = await db.query('SELECT cart_id FROM carts WHERE user_id = $1', [userId]);
    let cartId;

    if (cartQuery.rows.length === 0) {
      const newCartQuery = await db.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING cart_id', [userId]);
      cartId = newCartQuery.rows[0].cart_id;
    } else {
      cartId = cartQuery.rows[0].cart_id;
    }

    const numericPrice = parseFloat(String(price).replace(/[^0-9.-]+/g, ""));
    const newItemQuery = await db.query(
      `INSERT INTO cart_items (cart_id, product_title, quantity, price, img_url)
       VALUES ($1, $2, 1, $3, $4)
       ON CONFLICT (cart_id, product_title)
       DO UPDATE SET quantity = cart_items.quantity + 1
       RETURNING *`,
      [cartId, productTitle, numericPrice, imgURL]
    );

    res.status(201).json(newItemQuery.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/remove/:productTitle', authMiddleware, async (req, res) => {
  const { productTitle } = req.params;
  const userId = req.user.id;

  try {
    const cartQuery = await db.query('SELECT cart_id FROM carts WHERE user_id = $1', [userId]);
    if (cartQuery.rows.length === 0) {
      return res.status(404).json({ msg: 'Cart not found' });
    }
    const cartId = cartQuery.rows[0].cart_id;

    const itemQuery = await db.query('SELECT * FROM cart_items WHERE cart_id = $1 AND product_title = $2', [cartId, productTitle]);
    if (itemQuery.rows.length === 0) {
      return res.status(404).json({ msg: 'Item not in cart' });
    }

    const item = itemQuery.rows[0];

    if (item.quantity > 1) {
      const updatedItem = await db.query('UPDATE cart_items SET quantity = quantity - 1 WHERE cart_item_id = $1 RETURNING *', [item.cart_item_id]);
      res.json(updatedItem.rows[0]);
    } 
    else {
      await db.query('DELETE FROM cart_items WHERE cart_item_id = $1', [item.cart_item_id]);
      res.json({ msg: 'Item removed from cart' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;