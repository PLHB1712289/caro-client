import axiosClient from "../../apiClient";
import URL from "../../apiClient/URL";

const APIService = {
  getGame: async (id) => {
    const response = await axiosClient.get(`/game/${id}`);
    return response;
  },
  makeAMove: async (position, idGame) => {
    const response = await axiosClient.post(`/game/makeAMove`, {
      idGame,
      position,
    });
    return response;
  },
};

export default APIService;
