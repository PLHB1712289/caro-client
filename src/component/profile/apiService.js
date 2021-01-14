import axiosClient from "../../apiClient";
import URL from "../../apiClient/URL";

const APIService = {
  getUser: async () => {
    const response = await axiosClient.get(URL.GET_USER);

    return response;
  },
  getUserById: async (userId) => {
    const payload = { userId };
    const response = await axiosClient.post(URL.USER_BY_ID, payload);

    return response;
  },

  changePassword: async (oldPassword, newPassword) => {
    const payload = { oldPassword, newPassword };
    const response = await axiosClient.post(URL.CHANGE_PASSWORD, payload);
    return response;
  },
  forgotPassword: async (email) => {
    const payload = { email };
    const response = await axiosClient.post(URL.FORGOT_PASSWORD, payload);
    return response;
  },
  updateUser: async (avatarUrl, fullname) => {
    const payload = { avatarUrl, fullname };
    const response = await axiosClient.post(URL.UPDATE_USER, payload);
    return response;
  },
  getListUserRank: async () => {
    const response = await axiosClient.get(URL.GET_USER_LIST_RANK);
    return response;
  },

  getHistoryGame: async (page) => {
    const response = await axiosClient.get(
      `${URL.GET_HISTORY_GAME}?page=${page || 1}`
    );
    return response;
  },
};

export default APIService;
