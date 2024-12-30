'use client'
import Link from 'next/link'
import React from 'react'
import { Accordion } from 'react-bootstrap'

function Women() {
    return (
        <>
            <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Featured</Accordion.Header>
                    <Accordion.Body>
                        <ul className='list-unstyled'>
                            <li><Link href="#">New In</Link></li>
                            <li><Link href="#">Best Sellers</Link></li>
                            <li><Link href="#">Coming Soon</Link></li>
                            <li><Link href="#">The Skyline</Link></li>
                            <li><Link href="#">The Originals</Link></li>
                            <li><Link href="#">Workwear</Link></li>
                            <li><Link href="#">Gift Cards</Link></li>
                            <li><Link href="#" className='text-danger'>Sale</Link></li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Clothing</Accordion.Header>
                    <Accordion.Body>
                        <ul className='list-unstyled'>
                            <li><Link href="#">Shop All</Link></li>
                            <li><Link href="#">T-Shirts & Tops</Link></li>
                            <li><Link href="#">Blouses & Shirts</Link></li>
                            <li><Link href="#">Sweaters & Cardigans</Link></li>
                            <li><Link href="#">Blazers & Overshirts</Link></li>
                            <li><Link href="#">Jackets & Coats</Link></li>
                            <li><Link href="#">Denim</Link></li>
                            <li><Link href="#">Pants</Link></li>
                            <li><Link href="#">Dreses</Link></li>
                            <li><Link href="#">Skirts & Shorts</Link></li>
                            <li><Link href="#">Matching Sets</Link></li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Accessories</Accordion.Header>
                    <Accordion.Body>
                        <ul className='list-unstyled'>
                            <li><Link href="#">Shop All</Link></li>
                            <li><Link href="#">Beanies & Caps</Link></li>
                            <li><Link href="#">Shoes</Link></li>
                            <li><Link href="#">Bags</Link></li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="Women-images images m-3">
                <div className="image1 me-5 position-relative">
                    <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Denim</div>
                </div>
                <div className="image2 mt-4 position-relative">
                    <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Blouses</div>
                </div>
            </div>
        </>
    )
}

export default Women