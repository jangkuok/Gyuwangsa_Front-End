import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/userApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";


//store -> slice -> reducer -> initState
const initState ={
    userId : '',
    //roleNm : ''

}

const loadUserCookie = () => {
    const userInfo = getCookie('user')
        
    return userInfo
}


export const loginPostAsync = createAsyncThunk('loginPostAsync',(param)=>loginPost(param))

const loginSlice = createSlice({
    name : 'loginSlice',
    initialState : loadUserCookie() || initState,
    reducers : {
        login : (state, action) => {
            console.log("login.....")

            setCookie('user',JSON.stringify(action.payload),1)
            console.log(JSON.stringify(action.payload))

            //return {userId:action.payload.userId}
            return action.payload
        },
        logout : () => {
            console.log("logout.....")
            removeCookie("user")
            return {...initState}
        }
    },

    extraReducers:(builder) =>{
        builder.addCase(loginPostAsync.fulfilled,(state,action) =>{
            console.log("fulfilled")

            const payload = action.payload

            if(!payload.error){
                setCookie('user',JSON.stringify(payload),1)
            }

            console.log(payload)
            
            return payload
        })
        .addCase(loginPostAsync.pending,(state,action) =>{
            console.log("pending")
        })
        .addCase(loginPostAsync.rejected,(state,action) =>{
            console.log("rejected")
        })
    }
})

export const {login,logout} = loginSlice.actions

export default loginSlice.reducer