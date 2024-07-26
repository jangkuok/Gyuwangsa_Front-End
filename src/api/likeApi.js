import jwtAxios from "../util/jwtUtil"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/like`


//유저 좋아요 리스트
export const selectUserIdLikeChk = async (userId) => {
    const res = await jwtAxios.get(`${prefix}/${userId}`)
    return res.data
}

//유저 좋아요 상품 리스트
export const selectUserIdLikePdInfo = async (userId) => {
    const res = await jwtAxios.get(`${prefix}/list/${userId}`)
    return res.data
}


//유저 좋아요 리스트
export const insertPdLike = async (userId,pdNo) => {
    const res = await jwtAxios.get(`${prefix}/pick/${userId}/${pdNo}`)
    return res.data
}

//유저 좋아요 취소
export const removePdLike = async (userId,pdNo) => {
    const res = await jwtAxios.get(`${prefix}/cancel/${userId}/${pdNo}`)
    return res.data
}


