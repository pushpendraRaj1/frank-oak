'use client'
import React, { useEffect } from 'react'
import './../../Css/Payment.css'
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';

function PaymentSuccess() {

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 3000)
    }, [])

    return (
        <>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-5">
                        <div class="message-box _success">
                            <i class="fa fa-check-circle" aria-hidden="true"><FaCheckCircle color={'green'} /></i>
                            <h2> Your payment was successful </h2>
                            <p> Thank you for your payment. <br />
                                You will be shortly contacted on your <br />
                                provided mobile number by our team for deliver of your products </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentSuccess