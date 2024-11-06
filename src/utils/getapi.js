/* eslint-disable no-useless-catch */
import { apiClient, endpoints } from "./endpoints"

export const getUser=async(phone,name)=>{
    try{
      const response =await apiClient.post(endpoints.getUserdetails,{phone:phone,name:name})
      if (response.status===200 || response.status===201){
        return response
      }else{
        return false
      }
    }catch(err){
        throw(err)
    }
}