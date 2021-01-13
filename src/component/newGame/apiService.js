import apiClient from "../../apiClient";
import URL from "../../apiClient/URL";

const apiService = {
  createRoom: async (name, password, limitTime) => {
    const payload = { name, password, limitTime };
    return apiClient.post(URL.NEW_ROOM, payload);
  },
};

export default apiService;
