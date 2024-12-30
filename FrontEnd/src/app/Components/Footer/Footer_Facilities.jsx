import React from 'react'
import { LiaShippingFastSolid } from "react-icons/lia";
import { VscRefresh, VscActivateBreakpoints } from "react-icons/vsc";
import { MdOutlinePayment } from "react-icons/md";
import './../../Css/Footer.css';

function Footer_Facilities() {
    return (
            <div className="Footer-Facilities pb-5 d-flex justify-content-around text-center text-white">
                <div className="Free-Shipping">
                    <div className="icon">
                        <LiaShippingFastSolid size={40}/>
                    </div>
                    <div className='fs-5 my-3'>Free Shipping</div>
                    <div style={{fontSize:'13px'}}>On order over $99.</div>
                </div>
                <div className="Free-Returns">
                    <div className="icon">
                        <VscRefresh size={40}/>
                    </div>
                    <div className='fs-5 my-3'>Free Returns</div>
                    <div style={{fontSize:'13px'}}>Only keep what you love.</div>
                </div>
                <div className="Franks-Club">
                    <div className="icon">
                        <VscActivateBreakpoints size={40}/>
                    </div>
                    <div className='fs-5 my-3'>Frank&apos;s Club</div>
                    <div style={{fontSize:'13px'}}>Earn points and get rewards.</div>
                </div>
                <div className="Buy-Pay">
                    <div className="icon">
                        <MdOutlinePayment size={40}/>
                    </div>
                    <div className='fs-5 my-3'>Buy Now, Pay Later</div>
                    <div style={{fontSize:'13px'}}>Select Klarna at checkout.</div>
                </div>
            </div>
    )
}

export default Footer_Facilities