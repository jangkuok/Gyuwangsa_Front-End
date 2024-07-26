import jwtAxios from '../util/jwtUtil';
import { API_SERVER_HOST } from './pdInfoApi';
import axios from 'axios';


const host = `${API_SERVER_HOST}/user`


//로그인
export const loginPost = async(loginParam) => {
    const header = {headers:{"Content-Type": "x-www-form-urlencoded"}}

    const form = new FormData()
    form.append('username',loginParam.userId)
    form.append('password',loginParam.pwd)

    const res = await axios.post(`${host}/login`,form,header)

    return res.data

}

//회원 가입
export const joinUserInfo = async(user) => {
    const res = await axios.post(`${host}/userJoin`,user)
    return res.data
}

//브랜드 회원 가입
export const joinBrandUserInfo = async(formData) => {
    const header = { header: { 'Content-Tpye': 'multipart/form-data' } }
    const res = await axios.post(`${host}/brandUserJoin`,formData,header)
    return res.data
}


//회원 정보 수정
export const modifyUserInfo = async(user) => {
    const res = await jwtAxios.put(`${host}/modify`,user)

    return res.data
}

//회원 정보
export const selectUserInfo = async(userId) => {
    const res = await axios.get(`${host}/info/${userId}`)

    return res.data
}

//아이디 찾기
export const selectMemberFindUserID = async(name,email) => {
    const res = await axios.get(`${host}/find/${name}/${email}`)

    return res.data
}

//비밀번호 초기화
export const modifyMemberChangePassword = async(user) => {
    const res = await axios.put(`${host}/modifyPassword`,user)

    return res.data
}

//회원 탈퇴
export const removeCartList = async (userId) => {
    const res = await jwtAxios.get(`${host}/removeUser/${userId}`)

    return res.data
}


