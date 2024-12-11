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
        authorization: token,
      },
    });
    if (response.status === 202 || response.status === 200 || response.status === 201) {
      return response.data; // Always return the response data
    }
    return false;
  } catch (err) {
    throw err;
  }
};


export const updateDetails = async(name,phone)=>{
  try{
    const r = await apiClient.post(endpoints.updateName,{name:name,phone:phone})
    if(r.status===200){
      return 'y'
    }
    else{return 'x'}
  }catch(err){
    throw err
  }
}