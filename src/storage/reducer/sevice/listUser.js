// import TAG from "../../TAG";

import TAG from "../../TAG";

const INITIAL_STATE = [
  // {
  //   id: "1234",
  //   username: "user2",
  //   status: "online",
  // },
  // {
  //   id: "1235",
  //   username: "user2",
  //   status: "online",
  // },
  // {
  //   id: "1236",
  //   username: "user2",
  //   status: "online",
  // },
  // {
  //   id: "1237",
  //   username: "user2",
  //   status: "online",
  // },
];

const listUserReducer = (listUser = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.LIST_USER.UPDATE:
      return action.payload.data;

    case TAG.LIST_USER.ADD: {
      if (
        listUser.filter((user) => user.id === action.payload.user.id).length ===
        0
      )
        return listUser.concat(action.payload.user);
      return listUser;
    }

    case TAG.LIST_USER.REMOVE:
      return listUser.filter((user) => user.id !== action.payload.user.id);

    default:
      return listUser;
  }
};

export default listUserReducer;
