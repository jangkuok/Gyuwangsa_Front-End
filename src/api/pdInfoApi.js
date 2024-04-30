import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/product`


export const selectPdInfoByPdNo = async ({brandNo,categoryNo,itemNo,pdNo}) => {
    console.log({brandNo,categoryNo,itemNo,pdNo})
    const res = await axios.get(`${prefix}/${brandNo}/${categoryNo}/${itemNo}/${pdNo}`)
    return res.data
}

export const selectListByPdInfo = async (pageParam) => {
    const {page, size} = pageParam
    const res = await axios.get(`${prefix}/productList`,{params:{page,size}}) 
    return res.data
}