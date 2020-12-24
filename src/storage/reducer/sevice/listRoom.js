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
      const room = action.payload.room;
      room.no = listRoom.length + 1;
      return listRoom.concat(room);
    }

    case TAG.LIST_ROOM.REMOVE: {
      return listRoom.filter((item) => {
        if (item.id !== action.payload.room.id) return item;
        return null;
      });
    }

    case TAG.LIST_ROOM.UPDATE_INFO_USER: {
      const res = listRoom.map((item) => {
        console.log("action payload", action.payload);
        if (item.id === action.payload.room.idRoom)
          if (action.payload.room.idPlayer === 1)
            return { ...item, player1: action.payload.room.username };
          else return { ...item, player2: action.payload.room.username };

        return item;
      });
      console.log("REDUCER:", res);
      return res;
    }

    default:
      return listRoom;
  }
};

export default listRoomReducer;
