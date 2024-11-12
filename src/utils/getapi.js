/* eslint-disable no-useless-catch */
import { apiClient, endpoints } from "./endpoints"

export const getUser=async(phone,name,email)=>{
    try{
      const response =await apiClient.post(endpoints.getUserdetails,{phone:phone,name:name,email:email})
      if (response.status===200 || response.status===201){
        return response
      }else{
        return false
      }
    }catch(err){
        throw(err)
    }
}

export const getProduct=async(link)=>{
  try{
    const response =await apiClient.get(`${endpoints.productLink}${link}`)
    if (response.status===200 || response.status===201){
      return response
    }else{
      return false
    }
  }catch(err){
      throw(err)
  }
}

export const getTelegramLink = async (transId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await apiClient.get(`${endpoints.telegramLink}${transId}`, {
      headers: {
        authorization: token
      }
    });
    if (response.status === 200 || response.status === 201) {
      return response.data; // Return the response data if needed
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};
