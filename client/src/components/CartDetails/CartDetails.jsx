import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './CartDetails.css';
import axios from 'axios'; 
const CartDetails = () => {
  const { cart, removeFromCart, decreaseQuantity, clearCartFrontend } = useContext(CartContext);
    const [address, setAddress] = useState(''); 
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const processedCart = cart.map(item => ({
        ...item,
        price: parseFloat(item.price)
    }));

    const totalPrice = processedCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalNumberOfItems = processedCart.reduce((total, item) => total + item.quantity, 0);

    const handleCancel = (item) => {
        if (item.quantity > 1) {
            decreaseQuantity(item.product_title);
        } else {
            removeFromCart(item.product_title);
        }
    };

    const handleCheckout = async () => {
        if (!address.trim()) {
            setError('Please enter a delivery address.');
            return;
        }
        setError('');

        const token = localStorage.getItem('token');
        try {
            const res= await axios.post(`${import.meta.env.VITE_API_URL}/api/orders/checkout`,
                { address },
                { headers: { 'x-auth-token': token } }
            );

            clearCartFrontend(); 
            navigate('/invoice', { state: { order: res.data } });

        } catch (err) {
            console.error("Checkout failed", err);
            setError('Checkout failed. Please try again.');
        }
    };

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <h2>{totalNumberOfItems} Items</h2>
        </div>
        <div className="cart-table-header">
          <span className="product-details-header">PRODUCT DETAILS</span>
          <span className="price-header">PRICE</span>
          <span className="quantity-header">QUANTITY</span>
          <span className="total-header">TOTAL</span>
        </div>
        
        {processedCart.length === 0 ? (
            <p className="empty-cart-message">Your cart is currently empty.</p>
        ) : (
            processedCart.map(item => {
                const totalItemPrice = item.price * item.quantity;
    
                return (
                    <div className="cart-item" key={item.product_title}>
                    <div className="product-details">
                        <img src={item.img_url} alt={item.product_title} className="product-image-cart" />
                        <div className="product-info">
                        <span className="product-name">{item.product_title}</span>
                        </div>
                    </div>
    
                    <span className="price">₹{item.price.toFixed(2)}</span>
                    <span className="quantity">{item.quantity}</span>
                    <span className="total">₹{totalItemPrice.toFixed(2)}</span>
                    <button onClick={() => handleCancel(item)} className="cancel-button">X</button>
                    </div>
                );
            })
        )}
      </div>

      <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="summary-item">
                    <span>ITEMS {totalNumberOfItems}</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-item address-input-container">
                    <label htmlFor="address">DELIVERY ADDRESS</label>
                    <input
                        type="text"
                        id="address"
                        className="address-input"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your full address"
                    />
                </div>
                <div className="total-cost">
                    <span>TOTAL COST</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                {error && <p className="error-text">{error}</p>}
                <button onClick={handleCheckout} className="checkout-button">CHECKOUT</button>
            </div>
    </div>
  );
};

export default CartDetails;