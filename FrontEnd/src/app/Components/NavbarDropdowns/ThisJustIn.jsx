import Image from 'next/image'
import React from 'react'
import './../../Css/NavbarDropdowns/NavbarDropdown.css'
import Link from 'next/link'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ThisJustIn() {
    return (
        <div className='DropDown ThisJustIn-navdropdown fw-medium m-4 d-flex mg'>
            <div>
                <ul className='list-unstyled pe-5'>
                    <li><span className='heading mb-4 d-block fs-6 fw-medium'>Women&apos;s New Arrival</span></li>
                    <li><Link href="/collections">Shop All</Link></li>
                    <li><Link href="/collections">Tops</Link></li>
                    <li><Link href="/collections">Bottoms</Link></li>
                    <li><Link href="/collections">Jackets & Coats</Link></li>
                    <li><Link href="/collections">Blazers</Link></li>
                    <li><Link href="/collections">Dresses</Link></li>
                    <li><Link href="/collections">Accessories</Link></li>
                </ul>
            </div>
            <div>
                <ul className='list-unstyled ps-5 pe-5 me-5'>
                    <li><span className='heading mb-4 d-block fs-6 fw-medium'>Men&apos;s New Arrival</span></li>
                    <li><Link href="/collections">Shop All</Link></li>
                    <li><Link href="/collections">Tops</Link></li>
                    <li><Link href="/collections">Bottoms</Link></li>
                    <li><Link href="/collections">Overshirts</Link></li>
                    <li><Link href="/collections">Jackets & Coats</Link></li>
                    <li><Link href="/collections">Accessories</Link></li>
                </ul>
            </div>

            <div className="images">
                <div className="image1 me-5 position-relative">
                    <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Women&apos;s New Arrivals</div>
                </div>
                <div className="image2  position-relative">
                    <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Men&apos;s New Arrivals</div>
                </div>
            </div>
        </div>
    )
}

export default ThisJustIn