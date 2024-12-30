'use client'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import '././../Css/OffCanvas_data.css'
import Image from 'next/image';
import { logo_dark } from './../../Public/images.jsx'
import ThisJustIn from './OffCanvas_data/ThisJustIn';
import Women from './OffCanvas_data/Women';
import Men from './OffCanvas_data/Men';
import OurStory from './OffCanvas_data/OurStory';

function OffCanvas_data() {

    useEffect(()=>{
        Ref_ThisJustIn.current.style.backgroundColor = 'white';
        setShowThisJustIn('block');
    },[]);

    const Ref_ThisJustIn = useRef(null);
    const Ref_Women = useRef(null);
    const Ref_Men = useRef(null);
    const Ref_OurStory = useRef(null);

    const [showThisJustIn, setShowThisJustIn] = useState('none');
    const [showWomen, setShowWomen] = useState('none');
    const [showMen, setShowMen] = useState('none');
    const [showOurStory, setShowOurStory] = useState('none');

    const showNavItems = (e) => {
        Ref_ThisJustIn.current.style.backgroundColor = '#EBECEE';
        Ref_Women.current.style.backgroundColor = '#EBECEE';
        Ref_Men.current.style.backgroundColor = '#EBECEE';
        Ref_OurStory.current.style.backgroundColor = '#EBECEE';
        
        setShowThisJustIn('none');
        setShowWomen('none');
        setShowMen('none');
        setShowOurStory('none');


        let spaceremoved = `Ref_${e.target.innerHTML.replace(/ /g, "")}`;
        eval(spaceremoved).current.style.backgroundColor = 'white';

        let state_var = `setShow${e.target.innerHTML.replace(/ /g, "")}`;
        eval(state_var)('block');
    }

    return (
        <>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <Link href="#" className="logo fs-4 fw-bold">Frank And Oak</Link>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='OffCanvasBody-Nav text-center d-flex justify-content-between'>
                    <div ref={Ref_ThisJustIn} className='OffCB-Navitems py-3' onClick={showNavItems}>This Just In</div>
                    <div ref={Ref_Women} className='OffCB-Navitems py-3' onClick={showNavItems}>Women</div>
                    <div ref={Ref_Men} className='OffCB-Navitems py-3' onClick={showNavItems}>Men</div>
                    <div ref={Ref_OurStory} className='OffCB-Navitems py-3' onClick={showNavItems}>Our Story</div>
                </div>
                <div className='OffCanvasBody-Body m-3'>
                    <div className='OffCanvas-ThisJustIn' style={{ display: showThisJustIn }}>
                        <ThisJustIn />
                    </div>
                    <div className='OffCanvas-Women' style={{ display: showWomen }}>
                        <span>Women&apos;s home</span>
                        <Women />
                    </div>
                    <div className='OffCanvas-Men' style={{ display: showMen }}>
                        <span>Men&apos;s home</span>
                        <Men />
                    </div>
                    <div className='OffCanvas-OurStory' style={{ display: showOurStory }}>
                        <OurStory />
                    </div>
                    <div className='common-accordion'>
                        <Accordion alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Our Story</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='list-unstyled'>
                                        <li><Link href="#">Who we are</Link></li>
                                        <li><Link href="#">Sustainable practices</Link></li>
                                        <li><Link href="#">Design Ideology</Link></li>
                                        <li><Link href="#">Fabrics</Link></li>
                                        <li><Link href="#">Circular denim™</Link></li>
                                        <li><Link href="#">Partners and factories</Link></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Discover</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='list-unstyled'>
                                        <li><Link href="#">Gift Cards</Link></li>
                                        <li><Link href="#">Frank&apos;s club</Link></li>
                                        <li><Link href="#">Give$15, Get$15</Link></li>
                                        <li><Link href="#">Affiliate</Link></li>
                                        <li><Link href="#">Work with us</Link></li>
                                        <li><Link href="#">Our Stores</Link></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Customer Care</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='list-unstyled'>
                                        <li><Link href="#">Shipping Information</Link></li>
                                        <li><Link href="#">Returns & Exchanges</Link></li>
                                        <li><Link href="#">Coupon Codes</Link></li>
                                        <li><Link href="#">F.A.Q.</Link></li>
                                        <li><Link href="#">Terms & Conditions</Link></li>
                                        <li><Link href="#">Refund Policy</Link></li>
                                        <li><Link href="#">Privacy policy</Link></li>
                                        <li><Link href="#">Accessibility Statement</Link></li>
                                        <li><Link href="#">Customer Data Requests</Link></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <div className="logo m-auto py-5" style={{ width: '60px' }}>
                            <Image alt="" src={logo_dark} height={60} width={100}></Image>
                        </div>
                    </div>
                </div>
            </Offcanvas.Body>
        </>
    )
}

export default OffCanvas_data