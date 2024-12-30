import React from 'react'
import { CiInstagram, CiTwitter } from "react-icons/ci";
import { SlSocialFacebook } from "react-icons/sl";
import { FaPinterestP } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import { RiLinkedinFill } from "react-icons/ri";
import { logo, b_corp_certified } from './../../../Public/images.jsx'
import Image from 'next/image'

function Footer_social_media() {
    return (
        <>
                <div className="logo d-inline-block" style={{width:'60px'}}>
                    <Image alt="" src={logo} height={60} width={100}></Image>
                </div>
                <div style={{ fontSize: "10px" }} className='fw-bold mt-1'>Frank and Oak</div>
                <div className='social-media my-4'>
                    <CiInstagram size={30} className='mx-1' />
                    <SlSocialFacebook size={25} className='mx-1' />
                    <CiTwitter size={30} className='mx-1' />
                    <FaPinterestP size={25} className='mx-1' />
                    <BsEnvelope size={25} className='mx-1' />
                    <RiLinkedinFill size={25} className='mx-1' />
                </div>
                <div className='py-4 d-block'><Image alt="" style={{ width: '25%' }} src={b_corp_certified} height={75} width={50}></Image></div>
        </>
    )
}

export default Footer_social_media