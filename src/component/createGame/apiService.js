import axiosClient from "../../apiClient";
import URL from "../../apiClient/URL";

const APIService = {
    createNewGame: async(name)  => {

        const payload = { name };
        const response = await axiosClient.post(URL.NEW_GAME, payload);

        return response;
    },


};

export default APIService;
