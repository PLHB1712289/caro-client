import TAG from "../../TAG";

const action = {
  update: (token) => ({ type: TAG.TOKEN.UPDATE, payload: { token } }),
};

export default action;
