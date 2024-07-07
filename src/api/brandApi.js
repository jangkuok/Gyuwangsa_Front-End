import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/brand`

export const insertBrand = async (brandDTO) =>{
    const header = { header: { 'Content-Tpye': 'multipart/form-data' } }
    const res = await axios.post(`${prefix}/addBrand`,brandDTO,header)
    
    return res.data
}

export const selectBrandNo = async (brandNo) =>{
    const res = await axios.get(`${prefix}/info/${brandNo}`)
    return res.data
}