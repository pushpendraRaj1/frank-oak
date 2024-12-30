import Link from 'next/link'
import React from 'react'
import './../Css/Inspire_Better_Living.css'
import {IBL_img1,IBL_img2,IBL_img3,IBL_img4} from './../../Public/images.jsx'

function Inspire_Better_Living() {
    return (
        <>
            <div className="Inspire-Better-Living d-flex justify-content-center p-5 m-5 flex-wrap flex-lg-nowrap ">
                <div className="IBL_text pe-5 me-5">
                    <div className='IBL_title'>
                        <h1  className="fw-bold">Inspire Better Living</h1>
                    </div>
                    <div className="IBL_para">
                        <h2>
                        Born in Canada, we are grounded on innovation, our community, and respecting the planet we all call home.
                        </h2>
                    </div>
                    <div className='IBL_link'>
                        <Link href="#"><h2> Who We Are</h2></Link>
                    </div>
                </div>
                
                <div className='IBL_images d-flex justify-content-between flex-wrap align-content-between'>
                    <div className="IBL_img1 IBL_img" style={{backgroundImage:`url('${IBL_img1.src}')`}}><div>Sustainable Practices</div></div>
                    <div className="IBL_img2 IBL_img" style={{backgroundImage:`url('${IBL_img2.src}')`}}><div>Design Philosophy</div></div>
                    <div className="IBL_img3 IBL_img" style={{backgroundImage:`url('${IBL_img3.src}')`}}><div>Fabrics Innovation</div></div>
                    <div className="IBL_img4 IBL_img" style={{backgroundImage:`url('${IBL_img4.src}')`}}><div>Partners and Factories</div></div>
                </div>
            </div>
        </>
    )
}

export default Inspire_Better_Living