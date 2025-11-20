import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
const initialState = {
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,

}

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {

    try {

        const response = await api.post("/auth/register", userData, {
            withCredentials: true
        })

        return response.data;

    } catch (error) {
        // console.log(error);
        const message = error.response.data.message
        return rejectWithValue(message);
    }
})

export const loginUser = createAsyncThunk("auth/loginUser", async (loginData, { rejectWithValue }) => {

    try {

        const response = await api.post("/auth/login", loginData, {
            withCredentials: true
        })

        return response.data;

    } catch (error) {
        console.log(error);

        const message = error.response.data.message

        console.log(message);
        

        return rejectWithValue(message);

    }
})

export const checkAuthenticatedUser = createAsyncThunk("auth/checkAuthentucatedUser", async (_, { rejectWithValue }) => {

    try {

        const response = await api.get("/auth/check-auth", {
            withCredentials: true,
            headers: {
                "Cache-Control": "no-cache,no-store,must-revalidate,proxy-revalidate,max-stale=0,post-check=0,pre-check=0"
            }
        })

        return response.data;

    } catch (error) {
        console.log(error);
        const message = error.response.data.message
        return rejectWithValue(message);
    }
})
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // REGISTER USER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })

            .addCase(registerUser.rejected, (state, action) => {
                // console.log(action.payload);
                // console.log(action.error);

                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })

            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;

            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })

            // Check Authenticated User while reloading the page

            .addCase(checkAuthenticatedUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(checkAuthenticatedUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(checkAuthenticatedUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })
    }
})

export default authSlice.reducer;