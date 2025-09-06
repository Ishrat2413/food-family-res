import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'

import img from "../../../assets/home/Food Family Restaurant.png"
// import img1 from "../../../assets/home/01.jpg"
import img2 from "../../../assets/home/02.jpg"

const Banner = () => {
    return (
        <Carousel className='items-center'>
            <div>
                <img className='md:max-h-[650px] object-cover' src={img}  />
            </div>
            <div>
                <img className='md:max-h-[650px] object-cover' src={img2} />
            </div>
        </Carousel>

    );
};

export default Banner;