import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems, postChangeCart, postChangeCartPage } from "../api/cartApi";
import { accordion } from "@material-tailwind/react";

export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () => {
    return getCartItems()
})

export const postChangeCartAsync = createAsyncThunk('postChangeCartAsync', (param) => {
    return postChangeCart(param)
})

export const postChangeCartPageAsync = createAsyncThunk('postChangeCartPageAsync', (param) => {
    return postChangeCartPage(param)
})



const initState = []

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initState,

    extraReducers: (builder) => {
        builder.addCase(getCartItemsAsync.fulfilled, (state, action) => {
            console.log("getCartItemsAsync")
            console.log(action.payload)
            return action.payload
        })

        .addCase(postChangeCartAsync.fulfilled, (state, action) => {
            console.log("postChangeCartAsync")
            console.log(action.payload)
            return action.payload
        })

        .addCase(postChangeCartPageAsync.fulfilled, (state, action) => {
            console.log("postChangeCartPageAsync")
            console.log(action.payload)
            return action.payload
        })
    }
})

export default cartSlice.reducer