import React, { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import '././../Css/OffCanvas_data.css'
import Link from 'next/link';
import OffCanvas_Cart_Cards from './OffCanvas_Cart_data/OffCanvas_Cart_Cards';
import { IoLockClosedOutline } from "react-icons/io5";
import { Poppins, Kanit } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux';

const poppins = Poppins({ subsets: ['latin-ext'], weight: ['400'] })
const kanit = Kanit({ subsets: ['latin-ext'], weight: ['400'] })

function OffCanvas_Cart() {

    const [cart, setCart] = useState([]);
    const [filepath, setfilepath] = useState('');

    const [totalPrice, setTotalPrice] = useState(0);

    const user = useSelector((state) => state.user.value)

    const { cart_value, cart_loading, cart_error } = useSelector((state) => state.cart);
    useEffect(() => {
        if (!(JSON.stringify(cart_value) === "{}")) {
            console.log(user);
            console.log(cart_value);
            setCart(cart_value.data);
            setfilepath(cart_value.filepath);
            let sum = 0;
            cart_value.data.forEach(item => sum += item.quantity * item.product.price);
            setTotalPrice(sum);
            return;
        }
    }, [cart_value])


    return (
        <>
            <Offcanvas.Header closeButton>
                <Link href="#" className="logo fs-4 fw-bold">Frank And Oak</Link>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='w-100 text-white py-2 bg-black text-center'>
                    <strong>Free shipping on order $99+ and free returns</strong>
                </div>
                {
                    (JSON.stringify(user) === "{}") ?
                        <div className='text-center my-4 text-danger fs-4'>Please Login to See Your Cart</div>
                        :
                        (cart && cart.length == 0) ?
                            <div className='text-center my-4 text-danger fs-4'>Your Cart is Empty</div>
                            :
                            <>
                                <div className='OffCanvas-Cart-Cards p-3 overflow-scroll' style={{ height: '78%' }}>
                                    {
                                        cart && cart.map((cart_item, index) => (
                                            <OffCanvas_Cart_Cards key={index} cartProduct={cart_item} filepath={filepath} />
                                        ))
                                    }
                                </div>
                                <div className='px-2 bg-light'>
                                    <div className={`${kanit.className} m-2 fs-5 d-flex justify-content-between`}>
                                        <div className={`${kanit.className}`}>
                                            Subtotal
                                            (<span className={`${kanit.className} fs-6 opacity-75`}>{cart.length} items</span>)
                                        </div>
                                        <div className={`${kanit.className}`}>
                                            ₹{totalPrice}
                                        </div>
                                    </div>
                                    <Link href="/checkouts" className="text-decoration-none">
                                        <button className={`${poppins.className} w-100 p-2 fs-5 fw-bold text-white bg-black`}>Secure Checkout <IoLockClosedOutline size={17} /></button>
                                    </Link>
                                </div>
                            </>
                }
            </Offcanvas.Body>
        </>
    )
}

export default OffCanvas_Cart