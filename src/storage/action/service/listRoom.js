import TAG from "../../TAG";

const action = {
  update: (data) => ({ type: TAG.LIST_ROOM.UPDATE, payload: { data } }),
};

export default action;
