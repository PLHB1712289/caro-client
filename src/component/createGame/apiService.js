import axiosClient from "../../apiClient";
import URL from "../../apiClient/URL";

const APIService = {
    createNewGame: async(squares)  => {
        const player1=null;
        const player2=null;
        const payload = { squares,player1,player2 };
        const response = await axiosClient.post(URL.NEW_BOARD, payload);

        return response;
    },


};

export default APIService;
