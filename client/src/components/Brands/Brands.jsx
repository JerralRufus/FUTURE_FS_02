import React from "react";
import "./Brands.css" ;

function Brands() {
    return(
        <div className='brandBars'>
                        <div className='brandBar'>
                            <img src="/Brands/brand1.png" alt="Nike" />
                        </div>
                        <div className='brandBar'>
                            <img src="/Brands/brand3.png" alt="Adidas"/>
                        </div>
                        <div className='brandBar'>
                            <img src="/Brands/brand2.png" alt="Puma"/>
                        </div>
                    </div>
    ) ;
}


export default Brands ;