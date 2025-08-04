import React, { useState, useEffect } from 'react';
import "./Introduction.css";

function Introduction() {
    return (
        <div className="container-wrapper">
            <div className="container">
                <div className='slider'>
                    <div className="card"><img src="/SlideShowImgs/img1.jpeg" alt="Imag 1" /></div>
                    <div className="card"><img src="/SlideShowImgs/img2.jpeg" alt="Imag 2" /></div>
                    <div className="card"><img src="/SlideShowImgs/img3.jpg" alt="Imag 3" /></div>
                    <div className="card"><img src="/SlideShowImgs/img4.jpg" alt="Imag 4" /></div>
                    <div className="card"><img src="/SlideShowImgs/img5.webp" alt="Imag 5" /></div>
                </div>
            </div>

            <div className='featureBars'>
                <div className='featureBar'>
                    <img src="/Feature/feature1.png" alt="Free Shipping"/>
                    <div className="featureText">
                        <h2>Zero Fees, All Ease</h2>
                        <h6>Free Delivery on All Orders</h6>
                    </div>
                </div>
                <div className='featureBar'>
                    <img src="/Feature/feature2.png" alt="24/7 Support"/>
                    <div className="featureText">
                        <h2>Support Around the Clock</h2>
                        <h6>Support Anytime, Anywhere</h6>
                    </div>
                </div>
                <div className='featureBar'>
                    <img src="/Feature/feature3.png" alt="Secure Checkout"/>
                    <div className="featureText">
                        <h2>Pay Safe, Shop Easy</h2>
                        <h6>Safe & Secure Checkout</h6>
                    </div>
                </div>
            </div>

            
            <div className='carousel'>
                <span className="sectionTitle-home">Products</span>
                <div className='image-container-carousel'>
                    <img src="/Carousel/img1.png" alt="" />
                    <img src="/Carousel/img3.png" alt="" />
                    <img src="/Carousel/img4.png" alt="" />
                    <img src="/Carousel/img6.png" alt="" />
                    <img src="/Carousel/img7.png" alt="" />
                    <img src="/Carousel/img10.png" alt="" />
                    <img src="/Carousel/img12.png" alt="" />
                    <img src="/Carousel/img13.png" alt="" />
                    
                </div>
            </div>
            

        </div>
    );
}

export default Introduction;