'use client'
import React, { useEffect, useState } from 'react'
import QuickAdd_Card from './QuickAdd_Cards.jsx'
import './../Css/QuickAdd.css'
import Slider from "react-slick"; // npm i react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; //npm i slick-carousel
import { useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';



function QuickAdd() {

    const [products, setProducts] = useState([]);
    const [filepath, setFilepath] = useState('');
    const [show, setShow] = useState(true);


    const fetchedProducts = useSelector((state) => state.products.value);

    useEffect(() => {
        // setProducts(fetchedProducts.data);
        setProducts(fetchedProducts.data);
        console.log('Products => ', fetchedProducts);
        setFilepath(fetchedProducts.filepath);
    }, [fetchedProducts])

    useEffect(() => {
        console.log('products', products);
    }, [products])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 800) {
                setShow(false);
            }
        }
    }, [])

    // var settings = {
    //     slidesToShow: 4.1,
    //     slidesToScroll: 4,
    //     infinite: false,
    //     speed: 200,
    //     mobileFirst: true,//add this one
    //     responsive: [
    //         {
    //             breakpoint: 1420,
    //             settings: {
    //                 slidesToShow: 3.2,
    //                 slidesToScroll: 3
    //             }
    //         },
    //         {
    //             breakpoint: 1130,
    //             settings: {
    //                 slidesToShow: 2.5,
    //                 slidesToScroll: 2
    //             }
    //         },
    //         {
    //             breakpoint: 890,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 2
    //             }
    //         },
    //         {
    //             breakpoint: 710,
    //             settings: {
    //                 slidesToShow: 1.6,
    //                 slidesToScroll: 1
    //             }
    //         },
    //         {
    //             breakpoint: 570,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1
    //             }
    //         }
    //         // You can unslick at a given breakpoint now by adding:
    //         // settings: "unslick"
    //         // instead of a settings object
    //     ]
    // }




    return (
        <>
            <Carousel className={`carousel ${show ? '' : 'd-none'}`} interval={null}>
                {products && products.reduce((result, _, index, array) => { // All this calculation just to show 4 QuickCards in a single <Carousel.Item>, because only one QuickCard was showing on the screen at a time
                    // Group items into chunks of 3 (or desired number)
                    if (index % 4 === 0) {
                        result.push(array.slice(index, index + 4));
                    }
                    return result;
                }, []).map((chunk, idx) => (

                    <Carousel.Item key={idx}>
                        <div className="d-flex m-4 justify-content-between">
                            {chunk.map((item, index) => (
                                <QuickAdd_Card key={index} product={item} filepath={filepath} />
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

        </>

    )
}

export default QuickAdd