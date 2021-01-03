import TAG from "../../TAG";

const action = {
  update: (data) => ({ type: TAG.LIST_ROOM.UPDATE, payload: { data } }),
  updateInfoUser: (room) => ({
    type: TAG.LIST_ROOM.UPDATE_INFO_USER,
    payload: { room },
  }),
  add: (room) => ({ type: TAG.LIST_ROOM.ADD, payload: { room } }),
  remove: (room) => ({ type: TAG.LIST_ROOM.REMOVE, payload: { room } }),
  updateStatusRoom: (room) => ({
    type: TAG.LIST_ROOM.UPDATE_STATUS,
    payload: { room },
  }),
};

export default action;
