import axiosClient from "../../apiClient";
import URL from "../../apiClient/URL";

const APIService = {
    listGame: async()  => {

        const response = await axiosClient.post(URL.LIST_GAME);

        return response;
    },
    accessGame:async(idGame)=>{
        console.log("Check id game of access game in client");
        console.log(idGame);
        const payload={idGame};
        const response = await axiosClient.post(URL.ACCESS_GAME,payload);
        return response;
    }


};

export default APIService;
