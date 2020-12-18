import TAG from "../../TAG";

const INITIAL_STATE = {};

const boardReducer = (board = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.UPDATE:
      return board;
    default:
      return board;
  }
};

export default boardReducer;
