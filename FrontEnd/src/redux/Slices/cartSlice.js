const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

// export const addToCart = createAsyncThunk(
//     'cart/addToCart',
//     async (cartData, thunkApi) => {
//         try {
//             console.log('cartData', cartData);
//             const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/website/cart/add-to-cart`, cartData);
//             console.log(response.data);
//             return response.data
//         }
//         catch (error) {
//             console.log(error);
//             return thunkApi.rejectWithValue(error.message);
//         }
//     }
// )

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (user, thunkApi) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/website/cart/read-cart/${user}`);
            return response.data
        }
        catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error.message);
        }
    }
)


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart_value: {},
        cart_loading: false,
        cart_error: null,
    },
    reducers: {},
    extraReducers: (builder) => { // extraReducers for Thunk(addToCart)
        builder
            .addCase(fetchCart.pending, (state, action) => {
                console.log('cart-pending');
                state.cart_loading = true;
                state.cart_error = null; // Clear previous errors
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cart_loading = false;
                console.log('cart-success');
                state.cart_value = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.cart_loading = false;
                console.log('cart-error')
                state.cart_error = action.payload;
            })
    }
})


export default cartSlice.reducer;

