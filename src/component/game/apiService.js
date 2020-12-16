import axiosClient from "../../apiClient";
import URL from "../../apiClient/URL";

const APIService = {
    listGame: async()  => {

        const response = await axiosClient.post(URL.LIST_GAME);

        return response;
    },
    accessGame:async(idGame)=>{
        const response = await axiosClient.post(URL.ACCESS_GAME);

        return response;
    }


};

export default APIService;
