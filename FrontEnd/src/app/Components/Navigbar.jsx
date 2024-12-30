'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './../Css/Navbar.css'
import './../Css/ProfileDropDown.css'
import { CiSearch, CiHeart } from "react-icons/ci";
import { PiUserCircle } from "react-icons/pi";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaFacebookF } from "react-icons/fa";
import { MdLabelImportant } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link';
import ThisJustIn from './NavbarDropdowns/ThisJustIn';
import Women from './NavbarDropdowns/Women'
import Men from './NavbarDropdowns/Men';
import OurStory from './NavbarDropdowns/OurStory';
import Offcanvas from 'react-bootstrap/Offcanvas';
import OffCanvas_data from './OffCanvas_data';
import OffCanvas_Cart from './OffCanvas_Cart';
import { Modal, Toast } from 'react-bootstrap';
import { logo_dark } from '../../Public/images.jsx'
import { Roboto_Condensed } from 'next/font/google'
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Atom } from 'react-loading-indicators';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/Slices/productSlice';
import { fetchUserData } from '@/redux/Slices/userSlice';
import { useRouter } from "next/navigation";
import { FaRegCircleUser } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import { fetchProductCategories } from '@/redux/Slices/productCategorySlice';
import { fetchParentCategories } from '@/redux/Slices/parentCategorySlice';
import { fetchCart } from '@/redux/Slices/cartSlice';
import QuickAdd_Card from './QuickAdd_Cards';



const robotoCondensed = Roboto_Condensed({ subsets: ['latin-ext'], width: ['500'] });

function Navigbar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [profileDropDown, setProfileDropDown] = useState(false);

    const [showCart, setShowCart] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showSearchResultBox, setshowSearchResultBox] = useState(false);
    const [searchedProducts, setSearchProducts] = useState([]);
    const [filepath, setfilepath] = useState('');
    const [windowWidth, setWindowWidth] = useState(0);
    // const handleCloseCart = () => setShowCart(false);
    // const handleShowCart = () => setShowCart(true);

    const [toast, setToast] = useState({ text: '', color: '', delay: 0 });
    const [showToast, setShowToast] = useState(false);

    const [showCartOnSmallScreen, setShowCartOnSmallScreen] = useState(false);
    const handleCloseCartOnSmallScreen = () => setShowCartOnSmallScreen(false);
    const handleShowCartOnSmallScreen = () => setShowCartOnSmallScreen(true);

    const [LoginModalShow, setLoginModalShow] = useState(false);
    const [SignUpModalShow, setSignUpModalShow] = useState(false);

    const [userData, setUserData] = useState(null);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.value);
    const cart = useSelector((state) => state.cart.cart_value.data);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
        }
      }, []);
 

    useEffect(() => {
        dispatch(fetchProducts()); // Whenever website(header) loads, all products will be fetches in advance and stored in the redux store, so whenever we need to show data in any page, we can show it from redux store instead of calling api on every page
        dispatch(fetchParentCategories());
        dispatch(fetchProductCategories());
        dispatch(fetchUserData()); // Fetch user data from the server whenever user data is required in the website
    }, [dispatch]);


    useEffect(() => {
        if (user) {
            console.log('user._id=>', user._id)
            dispatch(fetchCart(user._id));
            setUserData(user);
            return
        }
    }, [user])


    const checkIfLoggedIn = () => {
        dispatch(fetchUserData());

        if (!(JSON.stringify(user) === "{}")) { // Checking if user is not a empty object. If user is empty that means we didn't get any cookie token from client or token which was stored in cookie was expired
            // alert('You are already Logged In');
            setProfileDropDown(!profileDropDown);
            return 0;
        }

        setLoginModalShow(true);
    }

    const logOut = () => {
        Cookies.remove('frankandoak_user');
        window.location.reload();
    }

    const handleToast = (text, color, delay) => {
        setToast({ text, color, delay });
        setShowToast(true);
    }

    const searchProducts = (e) => {
        // console.log(e.key);
        // console.log(e.target.value);
        if (e.target.value == '') setshowSearchResultBox(false);
        if (e.key === "Enter") {
            setSearchProducts([]);
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/website/product/search-products/${e.target.value}`)
                .then((res) => {
                    console.log(res);
                    setSearchProducts(res.data.products);
                    setfilepath(res.data.filepath);
                    if (res.data.products.length > 0) {
                        setshowSearchResultBox(true);
                    }
                    if (res.data.products.length == 0) {
                        setshowSearchResultBox(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

        }
    }

    useEffect(() => {
        if (!showSearch) setshowSearchResultBox(false);
    }, [showSearch])


    return (
        <>
            <div className="Navbar">
                <Toast className='position-fixed' style={{ position: 'fixed', top: '117px', right: '10px', zIndex: '99999', backgroundColor: toast.color, fontWeight: 'bold' }}
                    onClose={() => setShowToast(false)} show={showToast} delay={toast.delay} autohide>
                    <Toast.Body>{toast.text}</Toast.Body>
                </Toast>
                <div className='web-view position-relative d-flex justify-content-between pe-4'>
                    <div className="Menu">
                        <ul className='m-0'>
                            <li className='fs-4'><Link href="#" className="logo">Frank And Oak</Link></li>
                            <li><Link href="#"> This Just In</Link>
                                <div className="this-just-in" style={{ marginLeft: '-240px' }}>
                                    <ThisJustIn />
                                </div>
                            </li>
                            <li><Link href="#"> Women</Link>
                                <div className="Women" style={{ marginLeft: '-365px' }}>
                                    <Women />
                                </div></li>
                            <li><Link href="#"> Men</Link>
                                <div className="Men" style={{ marginLeft: '-460px' }}>
                                    <Men />
                                </div>
                            </li>
                            <li><Link href="#"> OurStory</Link>
                                <div className="OurStory" style={{ marginLeft: '-540px' }}>
                                    <OurStory />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="controls fs-3 align-content-center">
                        <nav>
                            <div className={`menu ${profileDropDown ? 'active' : ''}`}>
                                {userData ?
                                    <ul>
                                        <li><FaRegCircleUser size={20} /><span>{userData.first_name} {userData.last_name}</span></li>
                                        <li><GoMail size={20} /><span>{userData.email}</span></li>
                                    </ul> : ''}
                                <div role='button' className='logout-btn' onClick={logOut}>Sign Out</div>
                            </div>
                        </nav>

                        <ul className="m-0">
                            <li className='search d-flex align-items-center'>
                                <input type="search" disabled={!showSearch} onKeyUp={searchProducts} onInput={(e) => { if (e.target.value === '') setshowSearchResultBox(false) }}
                                    className={`form-control bg-white shadow-none me-3 ${showSearch ? 'opacity-100' : 'opacity-0'}`}

                                    style={{ width: `${showSearch ? '' : '0vw'}` }} placeholder='search products...'
                                />
                                <div className='' style={{ width: '30px' }}>
                                    <CiSearch role="button" className='searchIcon' onClick={() => setShowSearch(!showSearch)} />
                                </div>
                            </li>
                            <li className='position-relative'>
                                <PiUserCircle role='button' id="PiUserCircle" onClick={checkIfLoggedIn} />
                                <div className='userProfile position-absolute'></div>
                                <LogInModal show={LoginModalShow} onHide={() => setLoginModalShow(false)} onSignUp={() => setSignUpModalShow(true)} />
                                <SignUpModal show={SignUpModalShow} onHide={() => setSignUpModalShow(false)} onLogin={() => setLoginModalShow(true)} />
                            </li>
                            {/* <li><CiHeart /></li> */}
                            <li role='button' className='position-relative'>
                                <IoBagHandleOutline onClick={() => setShowCart(true)} />
                                <div className='position-absolute top-0 start-50 fs-6 ms-2'>
                                    {cart && cart.length}
                                </div>
                                <Offcanvas style={{ width: '35vw' }} placement='end' show={showCart} onHide={() => setShowCart(false)}>
                                    <OffCanvas_Cart />
                                </Offcanvas>
                            </li>
                        </ul>
                    </div>
                    <div style={{ height: `${showSearchResultBox ? '' : '0vh'}`, zIndex: '9999' }} className={`search-result-box ${showSearchResultBox ? 'p-4' : 'p-0'} `} >
                        {
                            searchedProducts && searchedProducts.map((product, index) => (
                                <QuickAdd_Card key={index} handleToast={handleToast} product={product} filepath={filepath} />
                            ))
                        }
                    </div>
                </div>
                <div className='mobile-view d-flex  flex-row justify-content-between pe-4 flex-wrap-reverse'>
                    <div className="controls d-flex fs-3 mb-2">
                        <nav>
                            <div className={`menu smallscrn-menu ${profileDropDown ? 'active' : ''}`}>
                                {userData ?
                                    <ul>
                                        <li><FaRegCircleUser size={20} /><span>{userData.first_name} {userData.last_name}</span></li>
                                        <li><GoMail size={20} /><span>{userData.email}</span></li>
                                    </ul> : ''}
                                <div role='button' className='logout-btn' onClick={logOut}>Sign Out</div>
                            </div>
                        </nav>
                        <ul className='m-0'>
                            <li className='search d-flex align-items-center'>

                                <div className='' style={{ width: '30px' }}>
                                    <CiSearch role="button" className='searchIcon' onClick={() => setShowSearch(!showSearch)} />
                                </div>
                            </li>
                            <li className='position-relative'>
                                <PiUserCircle role='button' id="PiUserCircle" onClick={checkIfLoggedIn} />
                                <div className='userProfile position-absolute'></div>
                                <LogInModal show={LoginModalShow} onHide={() => setLoginModalShow(false)} onSignUp={() => setSignUpModalShow(true)} />
                                <SignUpModal show={SignUpModalShow} onHide={() => setSignUpModalShow(false)} onLogin={() => setLoginModalShow(true)} />
                            </li>
                            <li role='button' className='position-relative'>
                                <IoBagHandleOutline onClick={() => setShowCart(true)} />
                                <div className='position-absolute top-0 start-50 fs-6 ms-2'>
                                    {cart && cart.length}
                                </div>
                                <Offcanvas style={{ width: `${windowWidth < 500 ? '80vw' : '35vw'}` }} placement='end' show={showCart} onHide={() => setShowCart(false)}>
                                    <OffCanvas_Cart />
                                </Offcanvas>
                            </li>
                        </ul>
                        <input type="search" disabled={!showSearch} onKeyUp={searchProducts} onInput={(e) => { if (e.target.value === '') setshowSearchResultBox(false) }}
                            className={`form-control bg-white shadow-none me-3 ${showSearch ? 'opacity-100' : 'opacity-0'}`}

                            style={{ width: `${showSearch ? '200px' : '0vw'}` }} placeholder='search products...'
                        />
                    </div>
                    <div className="Menu">
                        <ul className='m-0 d-flex align-items-center'>
                            <li >
                                <RxHamburgerMenu size={30} onClick={handleShow} />
                                <Offcanvas show={show} onHide={handleClose}>
                                    <OffCanvas_data />
                                </Offcanvas>
                            </li>
                            <li className='fs-4 fw-bold'><Link href="#" className="logo">Frank And Oak</Link></li>
                        </ul>
                    </div>


                    <div style={{ height: `${showSearchResultBox ? '' : '0vh'}`, zIndex: '9999' }} className={`search-result-box ${showSearchResultBox ? 'p-4' : 'p-0'} `} >
                        {
                            searchedProducts && searchedProducts.map((product, index) => (
                                <QuickAdd_Card key={index} handleToast={handleToast} product={product} filepath={filepath} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

function LogInModal(props) {

    const [formData, setformData] = useState({});
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [toast, setToast] = useState({ text: '', color: '' });
    const [loader, setloader] = useState(false);

    const handleInput = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleLogin = () => {

        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(formData.email) == false) { // using this function because type="email" is not validating email(it is not validating email we have to put button type to submit which if we did then page is refreshing, used e.preventDefault() but it is not working because of something parent element having some Link tag or form in it)
            setShow(true);
            setToast({ text: 'Invalid Email', color: '#ED4337' });
            return;
        }

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/website/user/login`, formData)
            .then((response) => {
                if (response.data.token) {
                    for (const key in formData) {
                        formData[key] = '';
                    }
                    setShow(true);
                    setToast({ text: 'Successfully logged in', color: '#72bf6a' });
                    Cookies.set('frankandoak_user', response.data.token);
                    window.location.reload();
                    props.onHide();
                }
            })
            .catch((error) => {
                if (error.response.data.message) {
                    setShow(true);
                    setToast({ text: error.response.data.message, color: '#ED4337' });
                }
            })
    }

    const handleForgotPassword = () => {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(formData.email) == false) {
            setShow(true);
            setToast({ text: 'Invalid Email', color: '#ED4337' });
            return;
        }
        setloader(true);
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/website/user/forgot-password/${formData.email}`)
            .then((response) => {
                setShow(true);
                console.log(response);
                setToast({ text: response.data.message, color: '#72bf6a' });
                setloader(false);
            })
            .catch((error) => {
                console.log(error);
                setShow(true);
                setToast({ text: error.response.data.message, color: '#ED4337' });
                setloader(false);
            })
    }

    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered className='LoginModal'>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='m-auto'>
                    <strong className={`${robotoCondensed.className} fs-2`}>Welcome Back!</strong><br />
                    <strong className={`${robotoCondensed.className} fs-6`}>Log in to enjoy your perks</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div>
                    {/* <ToastContainer // commented cause not working(only allowed on ToastContainer in one file, and we are using it in SignUpModal s)
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    /> */}
                    <Toast className='position-fixed' style={{ position: 'fixed', top: '40px', right: '10px', zIndex: '999', backgroundColor: toast.color, fontWeight: 'bold' }}
                        onClose={() => setShow(false)} show={show} delay='3000' autohide>
                        <Toast.Body>{toast.text}</Toast.Body>
                    </Toast>

                    <div className='d-flex justify-content-around'>
                        <div className='mb-2 bg-black m-auto' style={{ width: '50px' }}>
                            <Image alt="" src={logo_dark} width={40}></Image>
                        </div>
                        <div className='mb-2 ps-4 m-auto' style={{ width: '50px' }}>
                            <FaHeart size={30} />
                        </div>
                        <div className='mb-2 m-auto' style={{ width: '50px' }}>
                            <MdLabelImportant size={30} />
                        </div>
                    </div>
                    <div className='Offers d-flex justify-content-around mb-4 text-center'>
                        <div>
                            <div>Frank&apos;s Club</div>
                            <div>Earn points, get rewards</div>
                        </div>
                        <div>
                            <div>Wishlist</div>
                            <div>Save your favourites</div>
                        </div>
                        <div>
                            <div>Early access</div>
                            <div>Exclusive sale perks</div>
                        </div>
                    </div>
                    <div className='px-4'>
                        <form>
                            <div><input className='w-100 my-2 p-2' onChange={handleInput} value={formData.email} type='email' name="email" placeholder='Email Address' /></div>
                            <div><input className='w-100 my-2 p-2' onChange={handleInput} value={formData.password} type='password' name="password" placeholder='Password' /></div>
                            <div className={` text-center ${loader ? 'd-block' : 'd-none'}`}>
                                <Atom className="text-center fixed top-0 left-0" color="#32cd32" size="medium" text="" textColor="" />
                            </div>
                            <div className='text-decoration-underline d-inline-block' role="button" onClick={handleForgotPassword}>Forgot Password ?</div>
                            <div><button type='button' onClick={handleLogin} className='w-100 my-2 p-2 fw-bold border border-white border-2 text-white bg-black'>
                                Log In
                            </button></div>
                        </form>
                        {/* <hr /> */}
                        {/* <div>
                            <div className='text-center pb-2'>Social Login</div>
                            <div className='d-flex justify-content-around'>
                                <div role='button' className='border border-2 border-black p-2 text-center'>
                                    <FaFacebookF className='pb-1' size={20} />
                                    <span className='ms-1'>Sign in with Facebook</span>
                                </div>
                                <div role='button' className='border border-2 border-black p-2 text-center'>
                                    <FaGoogle className='pb-1' size={20} />
                                    <span className='ms-1'>Sign in with Google</span>
                                </div>
                            </div>
                        </div> */}
                        <hr />
                        <div className='text-center'>
                            Don&apos;t have an account?
                            <span role='button' onClick={() => { props.onHide(); props.onSignUp() }} className='text-decoration-underline'>
                                &nbsp;Sign up &#8594;
                            </span>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

function SignUpModal(props) {

    const [formData, setformData] = useState({ first_name: '', last_name: '', email: '', password: '' });
    const [showOTPBox, setshowOTPBox] = useState(false);
    const [loader, setloader] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    let timerInterval;

    const handleInput = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleRegister = (e) => {

        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(formData.email) == false) { // using this function because type="email" is not validating email(it is not validating email we have to put button type to submit which if we did then page is refreshing, used e.preventDefault() but it is not working because of something parent element having some Link tag or form in it)

            toast.error('Invalid Email Address', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            return;
        }

        function hasEmptyValues({ iShopFor, otp, ...obj }) {
            return Object.values(obj).some(
                value =>
                    value === null ||
                    value === undefined ||
                    value === '' ||
                    (Array.isArray(value) && value.length === 0) ||
                    (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)
            );
        }
        console.log(formData);
        if (hasEmptyValues(formData)) {
            toast.error('required fields are missing!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        setloader(true);

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/website/user/registration`, formData)
            .then((response) => {
                if (response.data.data) {

                    toast.error('You already have an account with this Email. Please Login', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    setloader(false);
                }
                else {

                    setloader(false);
                    setshowOTPBox(true);
                    toast.success('OTP send to your email address', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    setTimeout(() => {
                        setshowOTPBox(false);
                        clearInterval(timerInterval);
                    }, 120000);

                    setRemainingTime(120);
                    timerInterval = setInterval(() => {
                        setRemainingTime((prevTime) => {
                            if (prevTime <= 1) {
                                clearInterval(timerInterval); // Clear interval when time is up
                                return 0;
                            }
                            return prevTime - 1;
                        });
                    }, 1000);

                }
            })
            .catch((error) => {
                setloader(false);
                console.log(error);
                toast.error(error || error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
    }

    const validateOTP = (e) => {
        console.log(formData.otp);
        setloader(true);
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/website/user/validateOTP`, formData)
            .then((response) => {
                setshowOTPBox(false);
                setloader(false);

                clearInterval(timerInterval); // Stop the timer
                setRemainingTime(0);

                for (const key in formData) {
                    formData[key] = '';
                }

                if (response.status == 204) {

                    toast.success(<>Account Created Successfully.<br /> Login to Continue...</>, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }

                props.onLogin();
                setTimeout(() => props.onHide(), 5000);

            })
            .catch((error) => {
                setloader(false);
                toast.error(error.response && error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
    }

    useEffect(() => {
        // Clean up the interval on unmount
        return () => clearInterval(timerInterval);
    }, []);

    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered className='LoginModal'>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='m-auto'>
                    <strong className={`${robotoCondensed.className} fs-2`}>Welcome Back!</strong><br />
                    <strong className={`${robotoCondensed.className} fs-6`}>Log in to enjoy your perks</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    <div className='text-center'>
                        Already have an account?
                        <span role='button' onClick={() => { props.onHide(); props.onLogin() }} className='text-decoration-underline'>
                            &nbsp;Log in &#8594;
                        </span>
                    </div>
                    <div className='px-4'>
                        <form>
                            <div><input name='first_name' type='text' value={formData.first_name} onChange={handleInput} className='w-100 my-2 p-2' placeholder='First Name' /></div>
                            <div><input name='last_name' type='text' value={formData.last_name} onChange={handleInput} className='w-100 my-2 p-2' placeholder='Last Name' /></div>
                            <div><input name='email' type='email' value={formData.email} onChange={handleInput} className='w-100 my-2 p-2' placeholder='Email Address' /></div>
                            <div><input name='password' type='password' value={formData.password} onChange={handleInput} className='w-100 my-2 p-2' placeholder='Password' /></div>
                            <div><input className={`${showOTPBox ? 'd-block' : 'd-none'} w-100 my-2 p-2`} type="text" name="otp" onChange={handleInput} placeholder="OTP" /></div>
                            <div className="d-flex gap-5 my-2">I shop for
                                <div className="d-flex items-center gap-3">
                                    <input type="radio" name="iShopFor" onChange={handleInput} value="Men" id="gender" /> Men
                                    <input type="radio" name="iShopFor" onChange={handleInput} value="Women" id="gender" /> Women
                                    <input type="radio" name="iShopFor" onChange={handleInput} value="All" id="gender" /> All
                                </div>
                            </div>
                            <div className={` text-center ${loader ? 'd-block' : 'd-none'}`}>
                                <Atom className="text-center fixed top-0 left-0" color="#32cd32" size="medium" text="" textColor="" />
                            </div>
                            <div className='mt-3 text-center' style={{ marginTop: "20px", fontSize: "16px" }}>
                                {remainingTime > 0 ? `OTP expires in ${remainingTime} seconds` : ""}
                            </div>
                            {/* <div className={`${showOTPBox ? 'd-block' : 'd-none'} text-center`}>OTP will expire within {timer} seconds</div> */}
                            <div>
                                <button type='button'
                                    onClick={handleRegister}
                                    disabled={loader}
                                    className={`w-100 my-2 p-2 fw-bold border border-white border-2 text-white bg-black ${loader ? 'd-none' : 'd-block'} ${showOTPBox ? 'd-none' : 'd-block'}`}>
                                    Generate OTP
                                </button>
                            </div>
                            <div>
                                <button type='button'
                                    onClick={validateOTP}
                                    className={`w-100 my-2 p-2 fw-bold border border-white border-2 text-white bg-black ${showOTPBox ? 'd-block' : 'd-none'} `}>
                                    Validate OTP
                                </button>
                            </div>
                        </form>
                        {/* <hr />
                        <div>
                            <div className='text-center pb-2'>Social SignUp</div>
                            <div className='d-flex justify-content-around'>
                                <div role='button' className='border border-2 border-black p-2 text-center'>
                                    <FaFacebookF className='pb-1' size={20} />
                                    <span className='ms-1'>Sign in with Facebook</span>
                                </div>
                                <div role='button' className='border border-2 border-black p-2 text-center'>
                                    <FaGoogle className='pb-1' size={20} />
                                    <span className='ms-1'>Sign in with Google</span>
                                </div>
                            </div>
                        </div> */}
                        {/* <hr /> */}
                    </div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default Navigbar



