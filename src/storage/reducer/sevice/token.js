import TAG from "../../TAG";

const INITIAL_STATE = null;

const tokenReducer = (token = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.TOKEN.UPDATE:
      return action.payload.token;
    default:
      return token;
  }
};

export default tokenReducer;
