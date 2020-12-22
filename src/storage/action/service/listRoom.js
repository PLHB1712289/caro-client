import TAG from "../../TAG";

const action = {
  update: (data) => ({ type: TAG.LIST_ROOM.UPDATE, payload: { data } }),
  add: (user) => ({ type: TAG.LIST_ROOM.ADD, payload: { user } }),
};

export default action;
