import React from 'react'
import Footer_Facilities from './Footer/Footer_Facilities'
import Footer_About from './Footer/Footer_About.jsx'
import './../Css/Footer.css';

function Footer() {
    return (
        <div className="Footer bg-black p-5">
            <Footer_Facilities />
            <Footer_About/> 
        </div>

    )
}

export default Footer