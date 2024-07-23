import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems, postChangeCart, postChangeCartPage, postRemoveCart } from "../api/cartApi";

export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () => {
    return getCartItems()
})

export const postChangeCartAsync = createAsyncThunk('postChangeCartAsync', (param) => {
    return postChangeCart(param)
})

export const postChangeCartPageAsync = createAsyncThunk('postChangeCartPageAsync', (param) => {
    return postChangeCartPage(param)
})

export const postRemoveCartAsync = createAsyncThunk('postRemoveCartAsync', (param) => {
    return postRemoveCart(param)
})



const initState = []

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initState,

    extraReducers: (builder) => {
        builder.addCase(getCartItemsAsync.fulfilled, (state, action) => {
            console.log("getCartItemsAsync")
            return action.payload
        })

        .addCase(postChangeCartAsync.fulfilled, (state, action) => {
            console.log("postChangeCartAsync")
            return action.payload
        })

        .addCase(postChangeCartPageAsync.fulfilled, (state, action) => {
            console.log("postChangeCartPageAsync")
            return action.payload
        })

        
        .addCase(postRemoveCartAsync.fulfilled, (state, action) => {
            console.log("postRemoveCartAsync")
            return action.payload
        })
    }
})

export default cartSlice.reducer