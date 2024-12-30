'use client'
import React, { useState } from 'react'
import './../Css/QuickAdd_Cards.css'
import Link from 'next/link'
import { FaRegCircleDot } from "react-icons/fa6";
import { Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '@/redux/Slices/userSlice';
import { fetchCart } from '@/redux/Slices/cartSlice';
import axios from 'axios';

function QuickAdd_Card({ product, filepath, handleToast }) {
    const [Bg_img, setBg_img] = useState(filepath + product.thumbnail);
    const [selectedColor, setSelectedColor] = useState(product.color && product.color[0]._id);
    const [toast, setToast] = useState({ text: '', color: '', delay: 0 });
    const [showLoader, setShowLoader] = useState(false);

    const [show, setShow] = useState(false);

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    const add_To_Card = (e) => {
        setShowLoader(true);
        dispatch(fetchUserData());
        console.log('use addto card', user);
        setShow(true);
        if ((JSON.stringify(user) === "{}")) {
            setShowLoader(false);
            setToast({ text: 'Login to perform further actions!', color: '#ED4337', delay: 3000 });
            handleToast('Login to perform further actions!', '#ED4337', 3000)
            return 0;
        }
        const data = {
            user: user._id,
            product: product._id,
            color: selectedColor,
            size: e.target.dataset.value
        }
        console.log(data);

        // dispatch(addToCart(data));

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/website/cart/add-to-cart`, data)
            .then((response) => {
                setShow(true);
                setShowLoader(false);
                if (response.data.message === 'cart-quantity-updated') {
                    dispatch(fetchCart(user._id));
                    setToast({ text: <><span className='text-decoration-underline'>{product.name}</span> Quantity Updated</>, color: '#72bf6a', delay: 1000 });
                    handleToast(<><span className='text-decoration-underline'>{product.name}</span> Quantity Updated</>, '#72bf6a', 1000)
                }
                if (response.data.message === 'cart-product-added') {
                    dispatch(fetchCart(user._id));
                    setToast({ text: <><span className='text-decoration-underline'>{product.name}</span> Added to Cart</>, color: '#72bf6a', delay: 1000 });
                    handleToast(<><span className='text-decoration-underline'>{product.name}</span> Added to Cart</>, '#72bf6a', 1000)
                }
            })
            .catch((error) => {
                setShowLoader(false);
                console.log(error);
                setShow(true);
                setToast({ text: error.response.data.message && error.response.data.message, color: '#ED4337', delay: 3000 });
                handleToast(error.response.data.message && error.response.data.message, '#ED4337', 3000)
            })

    }



    return (
        <Link href={`/products/${product && product._id}?color=${selectedColor}`}>
            <div className="box position-relative">
                <div className={`w-100 h-100 position-absolute z-3 top-0 start-0 bg-black opacity-25 ${showLoader ? '' : 'd-none'}`}>
                    <div class="spinner-border position-absolute start-50 top-50 text-info" role="status">

                    </div>
                </div>
                <Toast className='position-fixed' style={{ position: 'fixed', top: '40px', right: '10px', zIndex: '99999', backgroundColor: toast.color, fontWeight: 'bold' }}
                    onClose={() => setShow(false)} show={show} delay={toast.delay} autohide>
                    <Toast.Body>{toast.text}</Toast.Body>
                </Toast>

                <div className='image position-relative d-flex justify-content-center align-items-end' style={{ backgroundImage: `url('${Bg_img}')` }} onMouseEnter={() => setBg_img(filepath + product.image_on_hover)} onMouseLeave={() => setBg_img(filepath + product.thumbnail)}>
                    <div className='best-seller bg-black p-1 text-white d-inline-block position-absolute m-1'>
                        BEST SELLER
                    </div>
                    <div className="quick-add px-3 py-2 text-center mb-2">
                        Quick add
                        <div className='quick-add-size'>
                            {
                                product.size && product.size.map((size, index) => (  // The .value property exists only for specific form-related elements like <input>, <textarea>, and <select>. For other elements like <div>, the value attribute does not automatically map to a .value property. Using data-* attributes, as they are designed for custom data.Then, access it using the dataset property(e.target.dataset.value). Using data-* attributes is generally preferred for clarity and standardization.
                                    <div key={index} data-value={size._id} role='button' className="size" onClick={(e) => { e.preventDefault(); e.stopPropagation(); add_To_Card(e); }}> {/* e.preventDefault() and e.stopPropagation() prevent navigation when a Link wraps the entire component. They ensure clicks on specific elements (like buttons) don’t trigger the Link's navigation to the product details page.  */}
                                        {size.name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='details'>
                    <ul className='m-0 list-unstyled p-0'>
                        <li className='title fw-bold my-2'>{product.name}</li>
                        <li className='price fs-6 my-2 d-flex ms-2'><div>{`₹${product.price}`}</div>&nbsp;<div className='text-decoration-line-through text-danger ms-3'>{`₹${product.mrp}`}</div></li>
                        <li className='color fw-bold'>{product.color && product.color.length} color</li>
                        <li className='show_color d-flex flex-wrap gap-2'>
                            {product.color && product.color.map((color) => (
                                <div key={color.code} role='button' onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedColor(color._id) }}>
                                    <FaRegCircleDot role='button' color={color.code}
                                        size={selectedColor === color._id ? 30 : 20} />
                                </div>
                            ))
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </Link>
    )
}

export default QuickAdd_Card