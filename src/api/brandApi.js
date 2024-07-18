import axios from "axios"
import jwtAxios from "../util/jwtUtil"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/brand`


//브랜드 등록
export const insertBrand = async (brandDTO) =>{
    const header = { header: { 'Content-Tpye': 'multipart/form-data' } }
    const res = await axios.post(`${prefix}/addBrand`,brandDTO,header)
    
    return res.data
}

//브랜드 수정
export const modifyBrand = async (brandDTO) =>{
    const header = { header: { 'Content-Tpye': 'multipart/form-data' } }
    const res = await axios.put(`${prefix}/modifyBrand`,brandDTO,header)
    
    return res.data
}

//브랜드 정보 조회
export const selectBrandNo = async (brandNo) =>{
    const res = await axios.get(`${prefix}/info/${brandNo}`)
    return res.data
}

//브랜드 리스트 조회
export const selectBrandList = async (page,size) =>{
    const res = await axios.get(`${prefix}/list`,{ params: { page, size } })
    return res.data
}

//브랜드 랜덤 리스트 조회
export const selectRandomBrandList = async () =>{
    const res = await axios.get(`${prefix}/random`)
    return res.data
}

//브랜드 전체 상품 조회
export const selectListByBrandPdInfo = async (brandNo,page,size, userId) =>{
    const res = await axios.get(`${prefix}/pdInfoList/${brandNo}`,{ params: { userId, page, size } })
    return res.data
}

//브랜드 카테고리 상품 조회
export const selectListByBrandCategory = async (brandNo,categoryNo,page,size,userId) =>{
    const res = await axios.get(`${prefix}/pdInfoList/${brandNo}/${categoryNo}`,{ params: { userId, page, size } })
    return res.data
}

//브랜드 아이템 상품 조회
export const selectListByBrandCategoryItem = async (brandNo,categoryNo,itemNo, page, size, userId) =>{
    const res = await axios.get(`${prefix}/pdInfoList/${brandNo}/${categoryNo}/${itemNo}`,{ params: { userId, page, size } })
    return res.data
}

//브랜드 키워드 조회
export const selectBrandByKeyword = async (keyword,page,size,userId) => {
    const res = await axios.get(`${prefix}/search/${keyword}`,{params:{userId,page,size}})
    return res.data
}

//브랜드 주문 전체 조회
export const selectBrandOrderList = async (brandNo,page,size) => {
    const res = await jwtAxios.get(`${prefix}/orderList/${brandNo}`,{params:{page,size}})
    return res.data
}

//브랜드 주문 상태 리스트 조회
export const selectBrandOrderDeliStatus = async (brandNo, deliStatus, page,size) => {
    const res = await jwtAxios.get(`${prefix}/orderList/${brandNo}/${deliStatus}`,{params:{page,size}})
    return res.data
}




