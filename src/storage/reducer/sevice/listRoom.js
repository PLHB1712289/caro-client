// import TAG from "../../TAG";

import TAG from "../../TAG";

const INITIAL_STATE = [
  // {
  //   no: 1,
  //   id: "1234",
  //   player1: "user1",
  //   player2: "user2",
  //   status: "waiting",
  // },
  // {
  //   no: 2,
  //   id: "1235",
  //   player1: "user1",
  //   player2: "user2",
  //   status: "waiting",
  // },
  // {
  //   no: 3,
  //   id: "1236",
  //   player1: "user1",
  //   player2: "user2",
  //   status: "waiting",
  // },
  // {
  //   no: 4,
  //   id: "1237",
  //   player1: "user1",
  //   player2: "user2",
  //   status: "waiting",
  // },
];

const listRoomReducer = (listRoom = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.LIST_ROOM.UPDATE:
      return action.payload.data;

    case TAG.LIST_ROOM.ADD: {
      return listRoom.concat(action.payload.user);
    }

    default:
      return listRoom;
  }
};

export default listRoomReducer;
