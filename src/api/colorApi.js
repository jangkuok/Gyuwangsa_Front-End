import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/color`


export const selectListColor = async () =>{
    const res = await axios.get(`${prefix}/colorList`)
    return res.data
}