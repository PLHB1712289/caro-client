import apiClient from "../../apiClient";
import URL from "../../apiClient/URL";

const api = {
  getListRoomUserOnline: async () => {
    return await apiClient.get(URL.GET_ROOM_USER_ONLINE);
  },
};

export default api;
