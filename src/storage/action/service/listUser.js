import TAG from "../../TAG";

const action = {
  update: (data) => ({ type: TAG.LIST_USER.UPDATE, payload: { data } }),
  add: (user) => ({ type: TAG.LIST_USER.ADD, payload: { user } }),
  remove: (user) => ({ type: TAG.LIST_USER.REMOVE, payload: { user } }),
};

export default action;
