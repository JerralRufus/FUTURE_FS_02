import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 
import "./Slideshow.css";

const images = ["/showImg/showImg1.png", "/showImg/showImg2.png", "/showImg/showImg3.png", "/showImg/showImg4.png"];

function Slideshow() {
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slideshow-body">
            <div className="containerSlideshow">
                <div className='textSlideShow'>
                    <h1>Step Up. Stand Out.</h1>
                    <p>Season End Flat</p>
                    <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h3>Shop Now</h3>
                    </Link>
                </div>
                <div className="image-container">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`cardImg ${index === activeIndex ? 'active' : ''}`}
                        >
                            <img src={image} alt={`Imag ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Slideshow;