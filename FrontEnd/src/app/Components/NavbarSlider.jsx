'use client';
import Link from 'next/link';
import React from 'react'
import './../Css/NavbarSlider.css';
import Slider from "react-slick"; // npm i react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // npm i slick-carousel

function NavbarSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
    }

    return (
        <div className='bg-black'>
            <div className="navslider text-white text-center w-50 m-auto">
                <Slider {...settings}>
                    <div>
                        <span>A cult favourite. Discover The Skyline. <Link href="#" className="text-white text-decoration-underline p-0">Shop Women</Link> <Link href="#" className="text-white text-decoration-underline p-0">Shop Men</Link></span>
                    </div>
                    <div>
                        <span>Enjoy free shipping on orders over $99 and free returns</span>
                    </div>
                    <div>
                        <span>Thousand Fell x Frank And Oak Sneaker at $99.99 —<Link href="#" className="text-white text-decoration-underline p-0">Shop Women</Link> <Link href="#" className="text-white text-decoration-underline p-0">Shop Men</Link></span>
                    </div>
                    <div>
                        <span>Just in— Your new wardrobe icons.<Link href="#" className="text-white text-decoration-underline p-0">Shop Women</Link> <Link href="#" className="text-white text-decoration-underline p-0">Shop Men</Link></span>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default NavbarSlider