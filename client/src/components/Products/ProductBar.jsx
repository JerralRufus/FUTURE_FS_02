import React from "react";
import { useNavigate } from "react-router-dom";
import './Product.css';

function ProductBar(props) {
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/product/${props.id}`);
    };

    return (
        <div className="productBar" onClick={handleProductClick}>
            <div className="product-image-box">
                <img src={props.img} alt={props.title} className="productImg" />
            </div>

            <div className="product-details">
                <p className="productTitle">{props.title}</p>
                <p className="productPrice">{props.price}</p>
            </div>
        </div>
    );
}

export default ProductBar;