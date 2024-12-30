import React, { useEffect } from 'react'
import './../Css/HearFromUs_Card.css'
import Link from 'next/link'
import Image from 'next/image'

function HearFromUs_Card(props) {
    return (
        <>
            <div className='HearFromUs_Card d-flex justify-content-center'>
                <div className="quote mt-5">
                    <div className='quote-para mt-5 p-4'>
                        <p className='fw-bold'>
                            {props.quote}
                        </p>
                        <p className='quote-author'>
                            {props.quote_author}
                        </p>
                    </div>
                    <div>
                        <p className='p-4'>
                            <Link href="#">Shop now</Link>
                        </p>
                    </div>
                </div>
                <div className="Image">
                    <Image alt="" src={props.image} style={{ height: "100%", width: "100%" }} />
                </div>
            </div>
        </>
    )
}

export default HearFromUs_Card