const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

export const fetchParentCategories = createAsyncThunk(
    'products/fetchParentCategories',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/website/parent-category/parent-categories`);
            return response.data
        }
        catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error.message);
        }
    }
)


export const parentCategorySlice = createSlice({
    name: "parentCategories",
    initialState: {
        value: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => { // extraReducers for Thunk(fetchParentCategories)
        builder
            .addCase(fetchParentCategories.pending, (state, action) => {
                console.log('parentCategory-pending');
                state.loading = true;
            })
            .addCase(fetchParentCategories.fulfilled, (state, action) => {
                state.loading = false;
                console.log('parentCategory-success');
                state.value = action.payload;
            })
            .addCase(fetchParentCategories.rejected, (state, action) => {
                state.loading = false;
                console.log('parentCategory-error')
                state.error = action.payload;
            })
    }
})



export default parentCategorySlice.reducer;

