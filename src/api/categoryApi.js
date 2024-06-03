import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/category`

export const selectListCategory = async () => {
    const res = await axios.get(`${prefix}/`) 
    return res.data
}

export const selectListItem = async (categoryNo) => {
    const res = await axios.get(`${prefix}/item/${categoryNo}`) 
    return res.data
}