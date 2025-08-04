// App.jsx
import Header from "./components/Header/Header";
import { Routes, Route } from 'react-router-dom';
import React from "react";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import ProductDetail from "./Pages/ProductDetail";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Cart from "./Pages/Cart";
import Invoice from "./Pages/Invoice";     
import Delivered from "./Pages/Delivered"; 
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/invoice" element={<Invoice />} />     
                <Route path="/delivered" element={<Delivered />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;