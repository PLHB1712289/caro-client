import apiClient from "../../apiClient";
import URL from "../../apiClient/URL";

const api = {
  getListMessage: async (idRoom, idGame) => {
    const token = localStorage.getItem("token") || "";
    return await apiClient.get(
      `${URL.GET_MESSAGE}?token=${token}&id=${idRoom}&idGame=${idGame || ""}`
    );
  },
};

export default api;
