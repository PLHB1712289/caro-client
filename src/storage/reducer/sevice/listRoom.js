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
        if (item.id === action.payload.room.idRoom)
          return {
            ...item,
            player1: action.payload.room.player1.username || "",
            player2: action.payload.room.player2.username || "",
          };

        return item;
      });

      return res;
    }

    case TAG.LIST_ROOM.UPDATE_STATUS: {
      const res = listRoom.map((item) => {
        return item.id === action.payload.room.id
          ? { ...item, status: action.payload.room.status }
          : item;
      });

      return res;
    }

    default:
      return listRoom;
  }
};

export default listRoomReducer;
