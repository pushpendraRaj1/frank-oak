import React from 'react'
import { LiaShippingFastSolid } from "react-icons/lia";
import { VscRefresh, VscActivateBreakpoints } from "react-icons/vsc";
import { MdOutlinePayment } from "react-icons/md";

function Facilities() {
    return (
        <div className="facilities bg-black py-2 text-center text-white fw-medium" style={{fontSize:'13px'}}>
            <div className="me-5 d-inline-flex align-items-center">
                <LiaShippingFastSolid size={20} className="me-3" />
                Free Shipping over $99
            </div>
            <div className="me-5 d-inline-flex align-items-center">
                <VscRefresh size={20} className="me-3" />
                Free Returns
            </div>
            <div className="me-5 d-inline-flex align-items-center">
                <VscActivateBreakpoints size={20} className="me-3" />
                Earn Poins
            </div>
            <div className="me-5 d-inline-flex align-items-center">
                <MdOutlinePayment size={20} className="me-3" />
                Buy Now, Pay Later
            </div>
        </div>
    )
}

export default Facilities