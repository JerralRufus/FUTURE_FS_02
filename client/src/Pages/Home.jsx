import React from "react";
import Introduction from "../components/Introduction/Introduction";
import Slideshow from "../components/Slideshow/Slideshow";
import Brands from "../components/Brands/Brands";

function Home () {
    return (
        <div>
            <Introduction />
            <Slideshow />
            <Brands />
        </div>  
    ) ;

}

export default Home ;