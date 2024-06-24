import { API_SERVER_HOST } from './pdInfoApi';
import axios from 'axios';


const host = `${API_SERVER_HOST}/user`

export const loginPost = async(loginParam) => {
    const header = {headers:{"Content-Type": "x-www-form-urlencoded"}}

    const form = new FormData()
    form.append('username',loginParam.userId)
    form.append('password',loginParam.pwd)

    const res = await axios.post(`${host}/login`,form,header)

    return res.data

}

export const joinUserInfo = async(user) => {
    const res = await axios.post(`${host}/userJoin`,user)

    return res.data
}

export const modifyUserInfo = async(user) => {
    const res = await axios.put(`${host}/modify`,user)

    return res.data
}