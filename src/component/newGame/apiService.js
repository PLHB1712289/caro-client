import apiClient from "../../apiClient";
import URL from "../../apiClient/URL";

const apiService = {
  createRoom: async (name, password) => {
    const payload = { name, password };
    return apiClient.post(URL.NEW_ROOM, payload);
  },
};

export default apiService;
