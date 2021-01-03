import axiosClient from "../../apiClient";
import URL from "../../apiClient/URL";

const APIService = {
  getUser: async () => {
    const response = await axiosClient.get(URL.GET_USER);

    return response;
  },
  changePassword:async(oldPassword,newPassword)=>{
    console.log("Den duoc day de chuan bi dung axios");
    const payload={oldPassword,newPassword};
    console.log("Check payload:",payload);
    const response= await axiosClient.post(URL.CHANGE_PASSWORD,payload);
    return response;
  },
  forgotPassword:async(email)=>{
    const payload={email};
    const response=await axiosClient.post(URL.FORGOT_PASSWORD,payload);
    return response; 
  }

  
};

export default APIService;
