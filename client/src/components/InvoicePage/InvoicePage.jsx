import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import "./InvoicePage.css" ;

const InvoicePage = () => {
    const location = useLocation();
    const { order } = location.state || {}; 

    if (!order) {
        return (
            <div className="invoice-container">
                <h2>Invoice Not Found</h2>
                <p>No order details were provided. You can view your orders in your delivered history.</p>
                <Link to="/shop">Continue Shopping</Link>
            </div>
        );
    }


    const orderDate = new Date(order.order_date).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
        <div className="invoice-container">
            <div className="invoice-header">
                <h1>Invoice</h1>
                <p>Thank you for your order!</p>
            </div>
            <div className="invoice-details">
                <p><strong>Order ID:</strong> {order.delivered_order_id}</p>
                <p><strong>Order Date:</strong> {orderDate}</p>
                <p><strong>Total Price:</strong> ₹{parseFloat(order.total_price).toFixed(2)}</p>
                <p><strong>Deliver To:</strong> {order.address}</p>
            </div>

            <h2 className="items-header">Items Ordered</h2>
            <div className="invoice-items-list">
                <div className="invoice-table-header">
                    <span>PRODUCT</span>
                    <span>QUANTITY</span>
                    <span>PRICE</span>
                    <span>TOTAL</span>
                </div>
                {order.items.map((item, index) => (
                    <div className="invoice-item" key={index}>
                        <div className="item-details">
                            <img src={item.img_url} alt={item.product_title} className="item-image" />
                            <span>{item.product_title}</span>
                        </div>
                        <span className="item-quantity">{item.quantity}</span>
                        <span className="item-price">₹{parseFloat(item.price).toFixed(2)}</span>
                        <span className="item-total">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <div className="invoice-footer">
                <Link to="/shop" className="continue-shopping-btn">Continue Shopping</Link>
            </div>
        </div>
    );
};

export default InvoicePage;