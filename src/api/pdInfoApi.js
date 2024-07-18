import axios from "axios"
import jwtAxios from "../util/jwtUtil"
import UserCustomLogin from "../hocks/userCustomLogin"
import { getCookie } from "../util/cookieUtil"
import { useSelector } from "react-redux"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/product`


export const selectPdInfoByPdNo = async (pdNo) => {
    //const res = await axios.get(`${prefix}/info/${pdNo}`)
    const res = await axios.get(`${prefix}/info/${pdNo}`)
    return res.data
}

export const selectListByPdInfo = async (pageParam) => {
    const { categoryNo, itemNo, page, size, userId } = pageParam
    const res = await axios.get(`${prefix}/item/${categoryNo}/${itemNo}`, {params: { userId, page, size }})
    return res.data
}

export const insertPdInfo = async (pdInfo) => {
    const header = { header: { 'Content-Tpye': 'multipart/form-data' } }
    //const res = await axios.post(`${prefix}/insertPdInfo`, pdInfo, header)
    const res = await jwtAxios.post(`${prefix}/insertPdInfo`, pdInfo, header)
    return res.data
}

export const modifyPdInfo = async (pdInfo, pdNo) => {
    const header = { header: {'Content-Tpye':'multipart/form-data'} }
    //const res = await axios.put(`${prefix}/modify/${pdNo}`, pdInfo, header)
    const res = await jwtAxios.put(`${prefix}/modify/${pdNo}`, pdInfo, header)
    return res.data
}

export const removePdInfo = async (pdInfo) => {
    const res = await jwtAxios.delete(`${prefix}/remove/${pdInfo.pdNo}`)
    return res.data
}

export const selectPdInfoByKeyword = async (keyword,page,size,userId) => {
    const res = await axios.get(`${prefix}/search/${keyword}`,{ params: { userId, page, size }})
    return res.data
}


export const selectLikePdInfoRank = async () => {
    const res = await axios.get(`${prefix}/likeRank`)
    return res.data
}

export const selectRandomPdList = async () => {
    const res = await axios.get(`${prefix}/randomPdInfo`)
    return res.data
}
