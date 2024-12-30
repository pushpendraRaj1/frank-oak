const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

export const fetchProductCategories = createAsyncThunk(
    'products/fetchProductCategories',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/website/product-category/product-categories`);
            return response.data
        }
        catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error.message);
        }
    }
)


export const productCatgorySlice = createSlice({
    name: "productCategories",
    initialState: {
        value: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => { // extraReducers for Thunk(fetchProductCategories)
        builder
            .addCase(fetchProductCategories.pending, (state, action) => {
                console.log('productCategory-pending');
                state.loading = true;
            })
            .addCase(fetchProductCategories.fulfilled, (state, action) => {
                state.loading = false;
                console.log('productCategory-success');
                state.value = action.payload;
            })
            .addCase(fetchProductCategories.rejected, (state, action) => {
                state.loading = false;
                console.log('productCategory-error')
                state.error = action.payload;
            })
    }
})



export default productCatgorySlice.reducer;

