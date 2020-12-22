import apiClient from "../../apiClient";
import URL from "../../apiClient/URL";

const api = {
  getListRoom: async () => {
    return await apiClient.get(URL.GET_LISTROOM);
  },
};

export default api;
