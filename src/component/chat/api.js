import apiClient from "../../apiClient";
import URL from "../../apiClient/URL";

const api = {
  getListMessage: async (idGame) => {
    const token = localStorage.getItem("token") || "";
    return await apiClient.get(
      `${URL.GET_MESSAGE}?token=${token}&id=${idGame}`
    );
  },
};

export default api;
