import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/product`


export const selectPdInfoByPdNo = async (pdNo) => {
    const res = await axios.get(`${prefix}/${pdNo}`)
    return res.data
}

export const selectListByPdInfo = async (pageParam) => {
    const {page, size} = pageParam
    const res = await axios.get(`${prefix}/productList`,{params:{page,size}}) 
    return res.data
}

export const insertPdInfo = async (pdInfo) => {
    const res = await axios.post(`${prefix}/insertPdInfo`,pdInfo)
    return res.data
}

export const modifyPdInfo = async (pdInfo) => {
    const res = await axios.put(`${prefix}/modify/${pdInfo.brandNo}/${pdInfo.categoryNo}/${pdInfo.itemNo}/${pdInfo.pdNo}`,pdInfo)
    return res.data
}

export const removePdInfo = async (pdInfo) => {
    const res = await axios.delete(`${prefix}/remove/${pdInfo.brandNo}/${pdInfo.categoryNo}/${pdInfo.itemNo}/${pdInfo.pdNo}`,pdInfo)
    return res.data
}