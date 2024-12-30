import { configureStore } from '@reduxjs/toolkit'
import productSlice from './Slices/productSlice'
import productCatgorySlice from './Slices/productCategorySlice'
import userSlice from './Slices/userSlice'
import parentCategorySlice from './Slices/parentCategorySlice'
import cartSlice from './Slices/cartSlice'

export const store = configureStore({
    reducer: {
        products: productSlice,
        parentCategories: parentCategorySlice,
        productCategories: productCatgorySlice,
        user: userSlice,
        cart: cartSlice
    },
})