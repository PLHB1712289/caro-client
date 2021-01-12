import axiosClient from "../../apiClient";
import URL from "../../apiClient/URL";

const APIService = {
  getUser: async () => {
    const response = await axiosClient.get(URL.GET_USER);

    return response;
  },
  changePassword:async(oldPassword,newPassword)=>{
    const payload={oldPassword,newPassword};
    const response= await axiosClient.post(URL.CHANGE_PASSWORD,payload);
    return response;
  },
  forgotPassword:async(email)=>{
    const payload={email};
    const response=await axiosClient.post(URL.FORGOT_PASSWORD,payload);
    return response; 
  },
  updateUser:async(avatarUrl,fullname)=>{
    const payload={avatarUrl,fullname};
    const response=await axiosClient.post(URL.UPDATE_USER,payload);
    return response;
  },

  
};

export default APIService;
