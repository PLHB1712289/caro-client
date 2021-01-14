import axiosClient from "../../apiClient";
import URL from "../../apiClient/URL";

const APIService = {
  getGame: async (idGame) => {
    return await axiosClient.get(
      `${URL.GET_DETAIL_HISTORY_GAME}?idGame=${idGame}`
    );
  },
};

export default APIService;
