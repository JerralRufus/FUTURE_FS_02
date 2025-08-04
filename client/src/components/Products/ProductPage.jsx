import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productList from './ProductList';
import { CartContext } from '../CartDetails/CartContext';
import { AuthContext } from '../../context/AuthContext';
import './ProductPage.css';

function Notification({ message, type }) {
    if (!message) {
        return null;
    }

    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    );
}

function ProductPage() {
    const { id } = useParams();
    const product = productList.find(p => p.index == id);

    const { addToCart } = useContext(CartContext);
    const { isAuthenticated } = useContext(AuthContext);
    
    const [selectedSize, setSelectedSize] = useState(null);
    const [showSizeWarning, setShowSizeWarning] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const availableSizes = product?.sizes || ["7", "8", "9", "10", "11", "12"];

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification.message]);

    if (!product) {
        return <h2>Product not found!</h2>;
    }

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        if (showSizeWarning) {
            setShowSizeWarning(false);
        }
    };

    const addProductToCart = () => {
        if (!selectedSize) {
            setShowSizeWarning(true);
            return;
        }

        if (!isAuthenticated) {
            setNotification({ message: 'Please log in to add items to your cart', type: 'error' });
            return;
        }
        
        const productToAdd = { ...product, selectedSize };
        addToCart(productToAdd);
        setNotification({ message: 'Product added to Cart', type: 'success' });
    };

    const formatPrice = (priceString) => {
        const priceValue = String(priceString).replace(/[₹$]/, '');
        const [integer, decimal] = priceValue.split('.');
        
        return {
            currency: '₹',
            integer,
            decimal
        };
    };
    
    const formattedPrice = formatPrice(product.price);

    return (
        <div className="product-detail-container">
            <div className="product-image-container">
                <img src={product.imgURL} alt={product.productTitle} className="product-image" />
            </div>
            <div className="product-info-container">
                <h1 className="product-title">{product.productTitle}</h1>
                <p className="product-description">{product.description}</p>
                
                <div className="product-price">
                    <span className="price-currency">{formattedPrice.currency}</span>
                    <span className="price-integer">{formattedPrice.integer}</span>
                    {formattedPrice.decimal && <span className="price-decimal">.{formattedPrice.decimal}</span>}
                </div>

                <div className="size-selector-container">
                    <h4 className="size-title">Select Size</h4>
                    <div className="size-options">
                        {availableSizes.map(size => (
                            <button
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    {showSizeWarning && <p className="size-warning">Please select a size!</p>}
                </div>
                
                <button 
                    className="add-to-cart-btn" 
                    onClick={addProductToCart}
                >
                    Add to Cart
                </button>
            </div>
            <Notification message={notification.message} type={notification.type} />
        </div>
    );
}

export default ProductPage;