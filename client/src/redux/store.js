import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slice/authSlice"
import adminProductReducer from "./slice/adminProductSlice"
const store = configureStore({
    reducer:{
        auth:authReducer,
        adminProduct:adminProductReducer
    }
});

export default store;