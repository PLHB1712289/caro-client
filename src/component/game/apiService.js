import axiosClient from "../../apiClient";
import URL from "../../apiClient/URL";

const APIService = {
  getRoom: async (id) => {
    return await axiosClient.get(`${URL.GET_ROOM}?id=${id}`);
  },
};

export default APIService;
