import React from "react";
import ProductBar from "./ProductBar";
import './Product.css';

function createProductsBar(productListEach) {
    return (
        <ProductBar
            key={productListEach.index}
            id={productListEach.index}
            title={productListEach.productTitle}
            img={productListEach.imgURL}
            price={productListEach.price}
            description={productListEach.description}
        />
    );
}

function Products({ products }) {
    return (
        <div id="productList">
            <span className="sectionTitle">Products</span>
            <div className="productBars">
                {products.map(createProductsBar)}
            </div>
        </div>
    );
}

export default Products;