'use client'
import Navigbar from '@/app/Components/Navigbar';
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import './../../Css/singleProduct.css'
import { CiHeart } from "react-icons/ci";
import Footer from '@/app/Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-bootstrap';
import axios from 'axios';
import { fetchUserData } from '@/redux/Slices/userSlice';
import { fetchCart } from '@/redux/Slices/cartSlice';
import Link from 'next/link';

function Product() {

    const [selectedSize, setselectedSize] = useState('');
    const [product, setProduct] = useState(null);
    const [filepath, setfilepath] = useState('');
    const [addToCartText, setaddToCartText] = useState('Add to Cart');
    const [showLoader, setShowLoader] = useState(false);
    const [show, setShow] = useState(false);
    const [toast, setToast] = useState({ text: '', color: '', delay: 0 });
    const products = useSelector((state) => state.products.value);
    const user = useSelector((state) => state.user.value);
    const idFromParams = useParams();
    const dispatch = useDispatch();

    const searchParams = useSearchParams();
    const color = searchParams.get('color');


    useEffect(() => {
        if (!(JSON.stringify(products) === '{}')) {
            const productOfParams = products.data.filter((product) => product._id === idFromParams.id);
            setProduct(productOfParams[0]);
            setfilepath(products.filepath);
        }
    }, [products])


    const addToCart = () => {
        if (selectedSize == '') {
            return;
        }

        // setShowLoader(true);
        dispatch(fetchUserData());
        console.log('use addto card', user);
        setShow(true);
        if ((JSON.stringify(user) === "{}")) {
            setShowLoader(false);
            setToast({ text: 'Login to perform further actions!', color: '#ED4337', delay: 3000 });
            return 0;
        }
        const data = {
            user: user._id,
            product: product._id,
            color: color,
            size: selectedSize,
        }
        console.log(data);

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/website/cart/add-to-cart`, data)
            .then((response) => {
                setShow(true);
                setShowLoader(false);
                if (response.data.message === 'cart-quantity-updated') {
                    dispatch(fetchCart(user._id));
                    setToast({ text: <><span className='text-decoration-underline'>{product.name}</span> Quantity Updated</>, color: '#72bf6a', delay: 1000 });

                }
                if (response.data.message === 'cart-product-added') {
                    dispatch(fetchCart(user._id));
                    setToast({ text: <><span className='text-decoration-underline'>{product.name}</span> Added to Cart</>, color: '#72bf6a', delay: 1000 });

                }
            })
            .catch((error) => {
                setShowLoader(false);
                console.log(error);
                setShow(true);
                setToast({ text: error.response.data.message && error.response.data.message, color: '#ED4337', delay: 3000 });
            })

    }


    return (
        <>
            <Toast className='position-fixed' style={{ position: 'fixed', top: '40px', right: '10px', zIndex: '99999', backgroundColor: toast.color, fontWeight: 'bold' }}
                onClose={() => setShow(false)} show={show} delay={toast.delay} autohide>
                <Toast.Body>{toast.text}</Toast.Body>
            </Toast>
            <Navigbar />
            <div className={`w-100 h-100 position-absolute z-3 top-0 start-0 bg-black opacity-25 ${showLoader ? '' : 'd-none'}`}>
                <div className="spinner-border position-absolute start-50 top-50 text-info" role="status">

                </div>
            </div>
            {product &&
                <div className='singleProduct flex-column flex-md-row'>
                    <div className='productImages'>
                        <div className='d-flex flex-md-wrap'>
                            {
                                product.gallery && product.gallery.map((image, index) => (
                                    <Link key={index} target="_blank" href={filepath + image}>
                                        <img key={index} className='p-2' src={filepath + image} />
                                    </Link>
                                ))
                            }
                            {
                                (!(product.gallery) || product.gallery && product.gallery.length == 0) ?
                                    <div className='text-danger text-center w-100 fs-3 fw-bold'>
                                        Gallery Images Not Available
                                    </div>
                                    : ''
                            }
                        </div>
                    </div>
                    <div className='productDetails p-5'>

                        <div role='button' className='goToHomePage'>
                            <Link href="/"><span>Home</span></Link> /
                            <Link href="/collections"><span>All Products</span></Link>
                        </div>

                        <div className='my-3 new'>
                            NEW
                        </div>
                        <div className='title'>
                            {product.name}
                        </div>
                        <div className='mt-2 d-flex align-items-center'>
                            <div className='price'>
                                ₹{product.price}
                            </div>
                            <div className='discount text-danger ms-2'>
                                -{(((product.mrp - product.price) / product.mrp) * 100).toFixed(2)}%
                            </div>
                        </div>
                        <div className='mrp text-danger fw-bold'>
                            ₹{product.mrp}
                        </div>
                        <div className='interest-free my-2'>
                            4 interest-free payments of $19.24 with Klarna.
                        </div>
                        <div>
                            {
                                (Array.from({ length: 5 })).map((_, index) => (
                                    <svg role='button' key={index} className='me-1' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="transparent" stroke="black" stroke-width="1"><polygon points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9" stroke-linejoin="round" /></svg>
                                ))
                            }
                        </div>
                        <hr className='my-4' />
                        <div className='select-size d-flex justify-content-between'>
                            <div>Select a size</div>
                            <div className='text-decoration-underline'>Sizing Guide</div>
                        </div>
                        <div className='sizes my-4'>

                            {
                                product.size.map((size, index) => (
                                    <div key={index} role='button' data-value={size._id} onClick={(e) => setselectedSize(e.target.dataset.value)} className={`${selectedSize == size._id ? 'bg-black text-white' : ''} px-2 me-3 py-1 productSize d-inline-block`}>
                                        {size.name}
                                    </div>
                                ))
                            }

                        </div>
                        <hr className='my-3' />
                        <div className='d-flex'>
                            <div role={`${selectedSize == '' ? '' : 'button'}`} className='addToCart w-75 position-relative me-2' onClick={addToCart} onMouseEnter={() => selectedSize == '' ? setaddToCartText('Select a Size') : ''} onMouseLeave={() => setaddToCartText('Add to Cart')} >
                                {addToCartText}
                            </div>
                            <div className='addToWishlist align-content-center bg-transparent'>
                                <CiHeart size={30} />
                            </div>
                        </div>
                        <hr className='my-4' />
                        <div className='offers d-flex'>
                            <div className='d-flex align-content-center align-items-center'>
                                <img style={{ width: '30px' }} src="https://cdn.shopify.com/s/files/1/0553/7100/6130/files/shipping-holiday-PDP-v1.svg?v=1732296041" />
                                <span className='ms-2'>Free Shipping over $99</span>
                            </div>
                            <div className='ms-5'>
                                <img style={{ width: '25px' }} src="https://cdn.shopify.com/s/files/1/0553/7100/6130/files/returns-holiday-PDP-v1.svg?v=1732296041" />
                                <span className='ms-2'>Free Extended Returns</span>
                            </div>
                        </div>
                        <hr className='my-4' />
                        <div className='overview fw-medium'>
                            <div className='fs-6'>Overview</div>
                            <div className='my-4'>
                                {product.description}
                            </div>
                        </div>
                    </div>
                </div >
            }
            <Footer />
        </>
    )
}

export default Product