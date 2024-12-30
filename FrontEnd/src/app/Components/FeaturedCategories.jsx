'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import './../Css/FeaturedCategories.css'
import { FC_img1, FC_img2, FC_img3, FC_img4 } from './../../Public/images.jsx'
import { useSelector } from 'react-redux';
import Slider from 'react-slick'
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function FeaturedCategories() {

    var settings = {
        slidesToShow: 4.1,
        slidesToScroll: 4,
        infinite: false,
        speed: 200,
        mobileFirst: true,//add this one
        responsive: [
            {
                breakpoint: 1420,
                settings: {
                    slidesToShow: 3.2,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1130,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 890,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 710,
                settings: {
                    slidesToShow: 1.6,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 570,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }

    const [productCategories, setproductCategories] = useState([]);
    const [filepath, setFilepath] = useState('');

    const fetchedProductCategories = useSelector((state) => state.productCategories.value);

    useEffect(() => {
        setproductCategories(fetchedProductCategories.data);
        setFilepath(fetchedProductCategories.filepath);
        console.log('fetchedProductCategories => ', fetchedProductCategories);
    }, [fetchedProductCategories])

    return (
        <div className='FeaturedCategories m-5'>
            <h2 className='my-5'>Featured Categories</h2>
            {/* <div className="images d-flex justify-content-between flex-wrap"> */}
            <Slider {...settings} className='Quick-Add'>
                {
                    productCategories && productCategories.map((productCategory, index) => (
                        productCategory.is_featured == true ?
                            <div key={index} className="img px-3 d-block mb-5">
                                <div><img className='d-block' src={filepath + productCategory.thumbnail}></img></div>
                                <span className='d-block py-2 fw-bold'>{productCategory.name}</span>
                            </div>
                            : ''
                    ))
                }
            </Slider>
            {/* <div className="img">
                    <img className='d-block' src={FC_img2.src}></img>
                    <span className='d-block py-2 fw-bold'>Womens Jackets</span>
                </div>
                <div className="img">
                    <img className='d-block' src={FC_img3.src}></img>
                    <span className='d-block py-2 fw-bold'>Mens Sweaters</span>
                </div>
                <div className="img">
                    <img className='d-block' src={FC_img4.src}></img>
                    <span className='d-block py-2 fw-bold'>Mens Jackets</span>
                </div> */}
            {/* </div> */}
        </div>
    )
}

export default FeaturedCategories