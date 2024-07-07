import axios from "axios"
import jwtAxios from "../util/jwtUtil"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/product`


export const selectPdInfoByPdNo = async (pdNo) => {
    //const res = await axios.get(`${prefix}/info/${pdNo}`)
    const res = await jwtAxios.get(`${prefix}/info/${pdNo}`)
    return res.data
}

// export const selectListByPdInfo = async (pageParam) => {
//     const {page, size, categoryNo, itemNo} = pageParam
//     console.log('api')
//     console.log(page, size, categoryNo, itemNo)
//     const res = await axios.get(`${prefix}/item/{${categoryNo}}/${itemNo}`,{params:{page,size}}) 
//     return res.data
// }

//export const selectListByPdInfo = async ({categoryNo,itemNo},pageParam) => {

export const selectListByPdInfo = async (pageParam) => {
    const { categoryNo, itemNo, page, size } = pageParam
    const res = await axios.get(`${prefix}/item/${categoryNo}/${itemNo}`, { params: { page, size } })
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
    //const res = await axios.delete(`${prefix}/remove/${pdInfo.brandNo}/${pdInfo.categoryNo}/${pdInfo.itemNo}/${pdInfo.pdNo}`, pdInfo)
    const res = await jwtAxios.delete(`${prefix}/remove/${pdInfo.brandNo}/${pdInfo.categoryNo}/${pdInfo.itemNo}/${pdInfo.pdNo}`, pdInfo)
    return res.data
}