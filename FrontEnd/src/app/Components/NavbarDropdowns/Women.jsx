import Image from 'next/image'
import React from 'react'
import './../../Css/NavbarDropdowns/NavbarDropdown.css'
import Link from 'next/link'

function Women() {
  return (
    <div className='DropDown Women-navdropdown fw-medium m-4 d-flex'>
            <div>
                
                <ul className='list-unstyled pe-5'>
                    <li><span className='heading mb-4 d-block fs-6 fw-medium'>Features</span></li>
                    <li><Link href="/collections">New In</Link></li>
                    <li><Link href="/collections">Best Sellers</Link></li>
                    <li><Link href="/collections">Coming Soon</Link></li>
                    <li><Link href="/collections">The Skyline</Link></li>
                    <li><Link href="/collections">The Originals</Link></li>
                    <li><Link href="/collections">Workwear</Link></li>
                    <li><Link href="/collections">Gift Cards</Link></li>
                    <li><Link href="/collections" className='text-danger'>Sale</Link></li>
                </ul>
            </div>
            <div>
                <ul className='list-unstyled ps-5'>
                    <li><span className='heading mb-4 d-block fs-6 fw-medium'>Clothing</span></li>
                    <li><Link href="/collections">Shop All</Link></li>
                    <li><Link href="/collections">T-shirts & Tops</Link></li>
                    <li><Link href="/collections">Blouses & Shirts</Link></li>
                    <li><Link href="/collections">Sweaters & Cardigans</Link></li>
                    <li><Link href="/collections">Blazers & Overshirts</Link></li>
                    <li><Link href="/collections">Jackest & Coats</Link></li>
                    <li><Link href="/collections">Denim</Link></li>
                    <li><Link href="/collections">Pants</Link></li>
                    <li><Link href="/collections">Dresses</Link></li>
                    <li><Link href="/collections">Skirts & Shorts</Link></li>
                </ul>
            </div>
            <div>
                <ul className='list-unstyled ps-5 pe-5 me-5'>
                    <li><span className='heading mb-4 d-block fs-6 fw-medium'>Accessories</span></li>
                    <li><Link href="/collections">Shop All</Link></li>
                    <li><Link href="/collections">Caps & Hats</Link></li>
                    <li><Link href="/collections">Shoes & Boots</Link></li>
                    <li><Link href="/collections">Bags</Link></li>
                </ul>
            </div>
            <div className="ps-5 images">
            <div className="image1 me-5 position-relative">
                    <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Denim</div>
                </div>
                <div  className="image2  position-relative">
                <div className="position-absolute bottom-0 p-3 text-white fs-5 ">Blouses</div>
                </div>
            </div>
        </div>
  )
}

export default Women