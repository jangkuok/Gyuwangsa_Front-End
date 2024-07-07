import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "./pdInfoApi"

const host = `${API_SERVER_HOST}/cart`

export const getCartItems = async () => {
    const res = await jwtAxios.get(`${host}/items`)

    return res.data
}

export const postChangeCart = async (cartItem) => {
    
    const header = { header: { 'Content-Tpye': 'multipart/form-data' } }
    const res = await jwtAxios.post(`${host}/changeCart`,cartItem,header)

    return res.data
}

export const postChangeCartPage = async (cartItem) => {
    const res = await jwtAxios.post(`${host}/changeCartPage`,cartItem)

    return res.data
}


