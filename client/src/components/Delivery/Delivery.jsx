import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './Delivery.css'; 


const Delivery = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchDeliveredOrders = async () => {
            if (isAuthenticated) {
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/delivered`, {
                        headers: { 'x-auth-token': token }
                    });
                    setOrders(res.data);
                } catch (error) {
                    console.error("Failed to fetch delivered orders", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchDeliveredOrders();
    }, [isAuthenticated]);

    if (loading) {
        return <p>Loading your order history...</p>;
    }

    if (!isAuthenticated) {
        return <p>Please log in to see your order history.</p>;
    }

    if (orders.length === 0) {
        return <p>You have no delivered orders.</p>;
    }

    return (
        <div className="delivered-container">
            <h2>Delivered Orders</h2>
            {orders.map(order => (
                <div key={order.delivered_order_id} className="order-card">
                    <div className="order-card-header">
                        <h3>Order ID: {order.delivered_order_id}</h3>
                        <span>{new Date(order.order_date).toLocaleDateString()}</span>
                    </div>
                    <div className="order-details">
                        <p><strong>Total:</strong> ₹{parseFloat(order.total_price).toFixed(2)}</p>
                        <p><strong>Address:</strong> {order.address}</p>
                    </div>
                    <h4>Items</h4>
                    <div className="order-items-list">
                        {order.items.map(item => (
                            <div key={item.delivered_order_item_id} className="order-item">
                                <img src={item.img_url} alt={item.product_title} />
                                <p>{item.product_title}</p>
                                <p>Qty: {item.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Delivery;