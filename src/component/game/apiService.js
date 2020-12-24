import axiosClient from "../../apiClient";
import URL from "../../apiClient/URL";

const APIService = {
  getRoom: async (id) => {
    const token = localStorage.getItem("token");
    return await axiosClient.get(`${URL.GET_ROOM}?id=${id}&token=${token}`);
  },
};

export default APIService;
