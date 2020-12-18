import axiosClient from "../../apiClient";
import URL from "../../apiClient/URL";

const api = {
  sendMessage: async ({ idGame, message }) => {
    const payload = { message, idGame };

    console.log(payload);

    const response = await axiosClient.post(URL.SEND_MESSAGE, payload);

    return response;
  },
  getListMessage: async (idGame) => {
    const response = await axiosClient.get(`${URL.GET_MESSAGE}?id=${idGame}`);

    return response;
  },
};

export default api;
