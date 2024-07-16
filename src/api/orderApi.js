import jwtAxios from "../util/jwtUtil"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/order`

export const orderPageLoad = async (cartItemDTO) => {
    //const header = { header: { 'Content-Tpye': 'multipart/form-data' } }
    //const res = await jwtAxios.post(`${prefix}/orderPageLoad`,cartItemDTO,header)
    const res = await jwtAxios.post(`${prefix}/orderPageLoad`,cartItemDTO)
    return res.data
}

export const addOrder = async (orderDtlDTO) => {
    const header = { header: { 'Content-Tpye': 'multipart/form-data' } }
    const res = await jwtAxios.post(`${prefix}/addOrder`,orderDtlDTO,header)
    return res.data
}

export const selectOrderListByUser = async (userId,page,size) => {
    const res = await jwtAxios.get(`${prefix}/orderList/${userId}`,{params:{page,size}})
    return res.data
}


export const removeOrder = async (ordDtlNo) => {
    const res = await jwtAxios.put(`${prefix}/orderCancel/${ordDtlNo}`)
    return res.data
}