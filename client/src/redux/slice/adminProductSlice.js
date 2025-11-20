import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api";
const initialState = {
    productList: [],
    isLoading: false,
    error: null
}

export const getAllProducts = createAsyncThunk("admin/getProduct", async (_, { rejectWithValue }) => {
    try {

        const response = await api.get("/products/")

        return response.data.data;
    } catch (error) {
        console.log(error);
        const message = error.response.data.message

        return rejectWithValue(message);
    }
})


export const addNewProduct = createAsyncThunk("admin/addProduct", async (productData, { rejectWithValue }) => {
    try {

        const response = await api.post("/products/add-product", productData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return response.data;

    } catch (error) {
        log(error);
        const message = error.response.data.message
        return rejectWithValue(message);
    }
})

export const deleteProduct = createAsyncThunk("admin/deleteProduct", async (id, { rejectWithValue }) => {
    try {

        const response = await api.delete(`/products/delete-product/${id}`)

        return response.data;

    } catch (error) {
        console.log(error);
        const message = error.response.data.message
        return rejectWithValue(message);

    }
})

export const updateImage = createAsyncThunk("admin/updateImage", async ({ productImage, id }, { rejectWithValue }) => {
    try {

        // /update/product-image/:id
        const response = await api.put(`/products/update/product-image/${id}`, { productImage: productImage }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return response.data;

    } catch (error) {
        console.log(error);
        const message = error.response.data.message
        return rejectWithValue(message);
    }
})


export const updateProductDetails = createAsyncThunk("admin/updateProductDetails", async ({ id, productDetails }, { rejectWithValue }) => {
    try {

        const response = await api.put(`/products/update-product/${id}`, productDetails,{
            headers:{
                "Content-Type":"application/json"
            }
        })

        return response.data;

    } catch (error) {
        console.log(error);
        const message = error.response.data.message
        return rejectWithValue(message);
    }
})
const adminProductSlice = createSlice({
    name: "adminProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Get all products
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload;

                state.error = null;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Add new product 

            .addCase(addNewProduct.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload.data);
                state.productList.push(action.payload.data);
                state.error = null;


            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            // Delete product

            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                let productId = action.payload.data;
                state.productList = state.productList.filter((product) => product._id !== productId);
                state.error = null;

            })
            .addCase(deleteProduct.rejected, (state, action) => {
                isLoading = false;
                state.error = action.payload;
            })


            // Update product image

            .addCase(updateImage.pending, (state) => {
                state.isLoading = false;
            })
            .addCase(updateImage.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
                const productId = action.payload.data._id;

                // find the product and update its image
                state.productList = state.productList.map((product) => {
                    if (product._id === productId) {
                        return { ...product, productImage: action.payload.data.productImage }
                    }
                    return product;

                })
                state.error = null;

            })
            .addCase(updateImage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            // Update product details
            .addCase(updateProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedProduct = action.payload.data
                state.productList = state.productList.map((product) => {
                    if (product._id === updatedProduct._id) {
                        return updatedProduct;
                    }
                return product;
                })
            })
            .addCase(updateProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }   )
    }
})

export default adminProductSlice.reducer;