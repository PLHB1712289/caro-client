import TAG from "../../TAG";

const INITIAL_STATE = [
  {
    id: "1234",
    username: "user2",
    status: "online",
  },
  {
    id: "1235",
    username: "user2",
    status: "online",
  },
  {
    id: "1236",
    username: "user2",
    status: "online",
  },
  {
    id: "1237",
    username: "user2",
    status: "online",
  },
];

const listUserReducer = (listUser = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return listUser;
  }
};

export default listUserReducer;
