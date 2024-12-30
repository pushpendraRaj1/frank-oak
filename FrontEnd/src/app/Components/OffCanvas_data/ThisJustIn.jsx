'use client'
import Link from 'next/link'
import React from 'react'
import { Accordion } from 'react-bootstrap'

function ThisJustIn() {
    return (
        <>
            <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Women&apos;s New Arrivals</Accordion.Header>
                    <Accordion.Body>
                        <ul className='list-unstyled'>
                            <li><Link href="#">Shop All</Link></li>
                            <li><Link href="#">Tops</Link></li>
                            <li><Link href="#">Bottoms</Link></li>
                            <li><Link href="#">Jackets & Coats</Link></li>
                            <li><Link href="#">Blazers</Link></li>
                            <li><Link href="#">Dresses</Link></li>
                            <li><Link href="#">Accessories</Link></li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Men&apos;s New Arrivals</Accordion.Header>
                    <Accordion.Body>
                        <ul className='list-unstyled'>
                            <li><Link href="#">Shop All</Link></li>
                            <li><Link href="#">Tops</Link></li>
                            <li><Link href="#">Bottoms</Link></li>
                            <li><Link href="#">Overshirts</Link></li>
                            <li><Link href="#">Jackets & Coats</Link></li>
                            <li><Link href="#">Accessories</Link></li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="ThisJustIn-images images m-3">
                <div className="image1 me-5 position-relative">
                    <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Women&apos;s New Arrivals</div>
                </div>
                <div className="image2 mt-4 position-relative">
                    <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Men&apos;s New Arrivals</div>
                </div>
            </div>
        </>
    )
}

export default ThisJustIn