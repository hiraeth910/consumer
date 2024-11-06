/* eslint-disable no-useless-catch */
import { apiClient, endpoints } from "./endpoints"

export const getUser=async({phone,name})=>{
    try{
      const response =await apiClient.post(endpoints.getUserdetails,{phone:phone,name:name})
      return response
    }catch(err){
        throw(err)
    }
}