'use client'
import React, { useEffect } from 'react'
import './../../Css/Payment.css'
import { MdCancel } from "react-icons/md";
import { useRouter } from 'next/navigation';

function PaymentCancel() {
    const router = useRouter();

    useEffect(()=>{
        setTimeout(()=>{
            router.push('/')
        },3000)
    },[])

    return (
        <>
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="message-box _success _failed">
                        <i class="fa fa-times-circle" aria-hidden="true"><MdCancel color={'red'} /></i>
                        <h2> Your payment failed </h2>
                        <p>  Try again later </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentCancel