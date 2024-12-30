const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";
import Cookies from "js-cookie";

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (_, thunkApi) => {
        try {

            let token = Cookies.get('frankandoak_user')
            if (token) {

                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/website/user/verifyUser`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}` // 'Bearer' added for security reasons
                    }
                }); 
                return response.data.data
            }
            return {};
        }
        catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => { // extraReducers for Thunk(fetchUserData)
        builder
            .addCase(fetchUserData.pending, (state, action) => {
                console.log('user-pending');
                state.loading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                console.log('user-success')
                state.value = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.value = {};
                console.log('user-error');
                console.log(action);
                state.error = action.payload;
            })
    }
})

export default userSlice.reducer;