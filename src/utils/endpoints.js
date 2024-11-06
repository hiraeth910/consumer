import axios from "axios"

export const baseurl = 'https://server.telemoni.in'

export const apiClient = axios.create({
    baseURL:baseurl
})
export const endpoints={ getUserdetails : '/api/user/consumer/login'}