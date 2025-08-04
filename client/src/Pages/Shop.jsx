import React, { useState } from "react";
import Slideshow from "../components/Slideshow/Slideshow";
import Products from "../components/Products/Products";
import Search from "../components/Search/Search";
import productList from "../components/Products/ProductList";

function Shop() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = productList.filter((product) =>
        product.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <Slideshow />
            <Products products={filteredProducts} />
        </div>
    );
}

export default Shop;