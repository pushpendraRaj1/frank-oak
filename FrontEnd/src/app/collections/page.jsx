'use client'
import React, { useEffect, useState } from 'react'
import Navigbar from '../Components/Navigbar'
import NavbarSlider from '../Components/NavbarSlider'
import './../Css/Collections.css'
import Footer from '../Components/Footer'
import QuickAdd_Card from '../Components/QuickAdd_Cards'
import { Noto_Sans } from 'next/font/google'
import { useSelector } from 'react-redux'

const notoSans = Noto_Sans({ subsets: ['latin-ext'], weight: ['400'] });

function Collection() {

    const [products, setProducts] = useState([]);
    const [filepath, setFilepath] = useState('');
    const [parentCategories, setparentCategories] = useState([]);
    const [productCategories, setproductCategories] = useState([]);
    const [loader, setLoader] = useState(true);
    const [filteredProducts, setfilteredProducts] = useState([]);
    const [checkedCheckboxes, setcheckedCheckboxes] = useState([]);

    const fetchedProducts = useSelector((state) => state.products.value);
    const fetchedProductCategories = useSelector((state) => state.productCategories.value);
    const fetchedParentCategories = useSelector((state) => state.parentCategories.value);
    const [windowWidth, setWindowWidth] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 500) {
                setWindowWidth(true);
            }
        }
    }, [])

    useEffect(() => {
        setProducts(fetchedProducts.data);
        console.log('Products => ', fetchedProducts);
        setFilepath(fetchedProducts.filepath);
        setLoader(false);
    }, [fetchedProducts])

    useEffect(() => {
        setproductCategories(fetchedProductCategories.data);
        console.log('fetchedProductCategories => ', fetchedProductCategories);
    }, [fetchedProductCategories])

    useEffect(() => {
        setparentCategories(fetchedParentCategories.data);
        console.log('fetchedParentCategories => ', fetchedParentCategories);
    }, [fetchedParentCategories])

    useEffect(() => {
        console.log('Filtered Products =>', filteredProducts);
        setProducts(filteredProducts);
        if (filteredProducts.length == 0) {
            setProducts(fetchedProducts.data);
        }
    }, [filteredProducts])

    const filterProductByCategory = (e) => {
        console.log(e.target.dataset.parent_category);

        if (e.target.checked) {
            const filtered = fetchedProducts.data.filter(product =>
                product.product_category._id == e.target.value
                &&
                product.parent_category._id == e.target.dataset.parent_category
            );
            setfilteredProducts([...filteredProducts, ...filtered]);
        }
        if (!e.target.checked) {
            setfilteredProducts(prevItems => prevItems.filter(product =>
                !(
                    product.product_category._id == e.target.value
                    &&
                    product.parent_category._id == e.target.dataset.parent_category
                )
            ));
        }
    }


    return (
        <>
            <div className='collections'>
                <NavbarSlider />
                <Navigbar />
                <div className={`${windowWidth ? '' : 'd-flex'}`}>
                    <div className={`ps-3 ${windowWidth ? 'w-100' : 'w-25'}`}>
                        <div className={`loader text-center m-auto ${loader ? 'd-block' : 'd-none'}`}>
                            <div id="loader">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className='Sub-Categories overflow-y-scroll border-bottom'>
                            {
                                parentCategories && parentCategories.map((parentCategory, index) => (
                                    <div key={index}>
                                        <div className='p-2 fs-4'><strong>{parentCategory.name}</strong></div>
                                        <ul className={`ms-4 list-unstyled ${windowWidth ? 'd-flex' : ''}`}>
                                            {productCategories && productCategories.map((productCategory, index) => (
                                                productCategory.parent_category.name === parentCategory.name ?
                                                    <li key={index}>

                                                        <label class="container">
                                                            {productCategory.name}
                                                            <input role='button' onClick={filterProductByCategory} type="checkbox" value={productCategory._id} data-parent_category={productCategory.parent_category._id} className='mx-2' />
                                                            <span class="checkmark"></span>
                                                        </label>

                                                        {/* <input role='button' onClick={filterProductByCategory} type="checkbox" value={productCategory._id} data-parent_category={productCategory.parent_category._id} className='mx-2' />{productCategory.name}
                                                        <span class="checkmark"></span> */}
                                                    </li>
                                                    : ''
                                            ))
                                            }
                                        </ul>
                                    </div>

                                ))
                            }
                        </div>
                    </div>
                    <div className={`${windowWidth ? 'w-100' : 'w-75'}`}>
                        <div className={`${notoSans.className} fs-5 py-3 border-top mx-3`}>
                            Shop All
                        </div>
                        <div className={`loader text-center m-auto ${loader ? 'd-block' : 'd-none'}`}>
                            <div id="loader">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className='products d-flex flex-wrap gap-4 overflow-y-scroll p-3'>

                            {products && products.map((product) => (
                                <div key={product._id} className='m-auto'>
                                    <QuickAdd_Card product={product} filepath={filepath} />
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Collection