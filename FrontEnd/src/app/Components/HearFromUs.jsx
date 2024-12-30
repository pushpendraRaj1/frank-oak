'use client'
import React from 'react'
import HearFromUs_Card from './HearFromUs_Card'
import './../Css/HearFromUs.css'
import {HFU_img1,HFU_img2,HFU_img3,HFU_img4,HFU_img5,HFU_img6} from './../../Public/images.jsx'
import Slider from "react-slick"; // npm i react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; //npm i slick-carousel



function HearFromUs() {
  var settings = {
    slidesToShow: 2.1,
    slidesToScroll: 2,
    infinite: false,
    speed:200,
    mobileFirst: true,//add this one
    responsive: [
      {
        breakpoint: 1420,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1130,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 800,
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


  return (
    <>
      <div className='HearFromUs w-100 mt-5 py-5'>
        <h2 className='text-center fw-medium mb-5'>You didn’t hear it from us</h2>
        <Slider {...settings}>
          <div><HearFromUs_Card alt="" image={HFU_img1} quote={"This is a simple vest but it looks expensive and falls nicely on the body! Soft and simple."} quote_author={"Emily H."} /></div>
          <div><HearFromUs_Card alt="" image={HFU_img2} quote={"I have this shirt in 4 other colours. It fits great and can easily be dressed down or up depending on what you’re doing."} quote_author={"Scott R."} /></div>
          <div><HearFromUs_Card alt="" image={HFU_img3} quote={"Great staple wardrobe piece and a flattering fit."} quote_author={"Lee-Anne D."} /></div>
          <div><HearFromUs_Card alt="" image={HFU_img4} quote={"Just an all around great shirt, fits amazing. Stylish and cozy."} quote_author={"Nick M."} /></div>
          <div><HearFromUs_Card alt="" image={HFU_img5} quote={"Love these pants — they're fitted and give outfits a clean look, but they're also very stretchy and non-constrictive."} quote_author={"hris O."} /></div>
          <div><HearFromUs_Card alt="" image={HFU_img6} quote={"Great fit and cut. Love the chic looseness."} quote_author={"Hilda H."} /></div>
        </Slider>
      </div>
    </>
  )
}

export default HearFromUs