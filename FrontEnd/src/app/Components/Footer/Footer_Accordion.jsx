'use client'
import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Our_Story_li, Discover_li, Customer_Care_li } from './Footer_ul.jsx'

function Footer_Accordion() {
    return (
        <>
            <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Our Story</Accordion.Header>
                    <Accordion.Body>
                        <Our_Story_li/>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Discover</Accordion.Header>
                    <Accordion.Body>
                        <Discover_li/>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Customer Care</Accordion.Header>
                    <Accordion.Body>
                        <Customer_Care_li/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}

export default Footer_Accordion