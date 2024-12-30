const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/website/product/products`);
            return response.data
        }
        catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error.message);
        }
    }
)


export const productSlice = createSlice({
    name: "products",
    initialState: {
        value: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => { // extraReducers for Thunk(fetchProducts)
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                console.log('product-pending');
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                console.log('product-success');
                state.value = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                console.log('product-error')
                state.error = action.payload;
            })
    }
})



export default productSlice.reducer;

