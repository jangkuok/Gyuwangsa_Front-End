import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/pdInfoApi";

const jwtAxios = axios.create()

const userInfo = getCookie("user")

const refreshJWT = async (accessToken, refreshToken) => {

    const host = API_SERVER_HOST

    const header = {headers: {"Authorization":`Bearer ${accessToken}`}}

    const form = new FormData()
    form.append('refreshToken',refreshToken)


    //const res = await axios.get(`${host}/user/refresh?refreshToken=${refreshToken}`,header)
    const res = await axios.post(`${host}/user/refresh`,form,header)

    console.log(res.data)

    return res.data
}

//axios 데이터 전송 시
const beforeReq = (config) => {

    console.log("axios 전송")

    if (!userInfo) {
        return Promise.reject(
            {
                response: {
                    data:
                    {
                        error: "REQUIRE_LOGIN"
                    }
                }
            }
        )
    }

    const {accessToken} = userInfo

    console.log("-------------"+accessToken)

    config.headers.Authorization = `Bearer ${accessToken}`

    return config
}

//전송 실패 시
const requsetFail = (err) =>{
    console.log("전송 실패")
    return Promise.reject(err)
}

//토큰 값 유효 기간 만료 시
const beforeRes = async (res) =>{

    console.log("--------beforeRes--------")

    //에러 토큰
    const data = res.data

    if(data && data.error === 'ERROR_ACCESS_TOKEN'){

        const userCookieValue = getCookie('user')

        console.log(userCookieValue.brandCd)

        const result = await refreshJWT(userCookieValue.accessToken,userCookieValue.refreshToken)

        //새로운 accessToken / refreshToken
        userCookieValue.accessToken = result.accessToken
        userCookieValue.refreshToken = result.refreshToken

        //Cookie 새롭게 저장
        setCookie('user',JSON.stringify(userCookieValue),1)

        //에러 제거를 위해 Header 변경
        const originalRequest = res.config

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`
    
        return await axios(originalRequest)
    }
    return res
}

//응답 실패시
const responseFail = (err) =>{
    return Promise.reject(err)
}
jwtAxios.interceptors.request.use(beforeReq,requsetFail)
jwtAxios.interceptors.response.use(beforeRes,responseFail)

export default jwtAxios