import axios from "axios"

export const baseurl = 'https://server.telemoni.in'

export const apiClient = axios.create({
    baseURL:baseurl
})
export const endpoints={
     getUserdetails : '/api/user/consumer/login',
     getPayemntLink : '/api/payment/pay',
     productLink : '/api/user/get/productdetails/',
     telegramLink: '/api/payment/callback/',
     updateName:'/api/user/complete-profile',
     getpurchases:'/api/payment/get/user/purchases'
    }