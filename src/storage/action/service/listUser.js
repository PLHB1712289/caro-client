import TAG from "../../TAG";

const action = {
  update: (data) => ({ type: TAG.LIST_USER.UPDATE, payload: { data } }),
};

export default action;
