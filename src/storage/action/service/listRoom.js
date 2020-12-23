import TAG from "../../TAG";

const action = {
  update: (data) => ({ type: TAG.LIST_ROOM.UPDATE, payload: { data } }),
  add: (room) => ({ type: TAG.LIST_ROOM.ADD, payload: { room } }),
  remove: (room) => ({ type: TAG.LIST_ROOM.ADD, payload: { room } }),
};

export default action;
