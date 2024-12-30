import React from 'react'
import './../../Css/Footer/Footer_About.css'
import Footer_Accordion from './Footer_Accordion.jsx';
import { Our_Story_li, Discover_li, Customer_Care_li } from './Footer_ul.jsx'
import Footer_social_media from './Footer_social_media'



function Footer_About() {
    return (
        <>
            <div className='Footer_About text-white m-5 pt-4 d-flex justify-content-between'>
                <div className='About_us d-flex justify-content-between w-75 me-5'>
                    <div className='Social_media-lg'>
                        <Footer_social_media />
                    </div>
                    <div className='Out-Story'>
                        <h4>Our Story</h4>
                        <Our_Story_li />
                    </div>
                    <div className='Discover'>
                        <h4>Discover</h4>
                        <Discover_li />
                    </div>
                    <div className='Customer-Care'>
                        <h4>Customer Care</h4>
                        <Customer_Care_li />
                    </div>
                </div>
                <div className='Stay-in-touch w-25'>
                    <h4>Stay in touch</h4>
                    <p style={{ fontSize: '12px' }} className='py-2'>Join our newsletter and stay in the know about new collections, outfit inspiration, sales, and more.</p>
                    <input type='email' placeholder='Email' className='p-2 my-2' style={{ backgroundColor: '#1F2322', border: '1px solid grey', width: '100%' }} />
                    <br />
                    <input type='text' placeholder='First Name' className='p-2 my-2' style={{ backgroundColor: '#1F2322', border: '1px solid grey', width: '100%' }} />
                    <div style={{ fontSize: "13px" }} className='py-2'>I shop for
                        <input className='mx-2 ms-3' type="radio" id="rd_Women" name="Gender" style={{ accentColor: "white", cursor: 'pointer', backgroundColor: 'yellow' }} />
                        <label htmlFor="rd_Women">Women</label>
                        <input className='mx-2 ms-3' type="radio" id="rd_Men" name="Gender" style={{ accentColor: "white", cursor: 'pointer' }} />
                        <label htmlFor="rd_Men">Men</label>
                        <input className='mx-2 ms-3' type="radio" id="rd_All" name="Gender" style={{ accentColor: "white", cursor: 'pointer' }} />
                        <label htmlFor="rd_All">All</label>
                        <div>
                            <button className='w-100 my-3 p-2 fw-bold text-white bg-black' style={{ border: '2px solid white' }}>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Accordion mb-5'>
                <Footer_Accordion />
            </div>
            <div className='Social_media-sm text-center text-white'>
                <Footer_social_media />
            </div>
            <p className='ps-5' style={{ fontSize: '12px', color: 'white' }}>© Frank And Oak 2024 , All Rights Reserved.</p>
        </>
    )
}

export default Footer_About