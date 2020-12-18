import TAG from "../../TAG";

const INITIAL_STATE = {
  id: "",
  message: [],
};

const chatReducer = (room = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.UPDATE:
      return room;
    default:
      return room;
  }
};

export default chatReducer;
