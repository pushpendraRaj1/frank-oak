'use client'
import Link from 'next/link'
import React from 'react'
import { Accordion } from 'react-bootstrap'

function OurStory() {
    return (
        <>
            <div className="OurStory-images images m-3">
                <div className="image1 me-5 position-relative">
                    <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Who we are</div>
                </div>
                <div className="image2 mt-4 position-relative">
                    <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Sustainable Practices</div>
                </div>
                <div className="image3 mt-4 position-relative">
                    <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Design Philoshophy</div>
                </div>
                <div className="image4 mt-4 position-relative">
                    <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Fabrics</div>
                </div>
                <div className="image5 mt-4 position-relative">
                    <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Circular denim™</div>
                </div>
                <div className="image6 mt-4 position-relative">
                    <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Partners and Factories</div>
                </div>
            </div>
        </>
    )
}

export default OurStory