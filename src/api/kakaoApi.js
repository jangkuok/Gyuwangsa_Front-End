import axios from "axios"
import { API_SERVER_HOST } from "./pdInfoApi"

const rest_api_key = 'bbef9f1a98295e51c1a82eeb9710d5bb'
const redirect_uri = 'http://localhost:3000/user/kakao'
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`
const access_token_url = 'https://kauth.kakao.com/oauth/token'

const host = `${API_SERVER_HOST}`

export const getKakaoLoginLink = () => {

    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

    return kakaoURL
}

export const getAccessToken = async (authCode) => {

    const header = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}}
    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode
    }

    const res = await axios.post(access_token_url, params, header)

    return res.data.access_token
}

export const getUserWithAccessToken = async (accessToken) => {
    const res = await axios.get(`${host}/user/kakaoLogin?accessToken=${accessToken}`)

    return res.data
}


