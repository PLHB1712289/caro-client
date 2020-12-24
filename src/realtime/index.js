import io from "socket.io-client";
import config from "../config";
import TAG from "./data";
import store from "../storage";
import action from "../storage/action";

let socketInstance = null;
let token = localStorage.getItem("token");

const Realtime = class {
  constructor() {
    this.socket = null;
    this.connect();
  }

  connect() {
    if (!socketInstance) socketInstance = io(config.URL_SERVER);

    this.socket = socketInstance;

    if (token) {
      this.updateListUserOnline(token);
    }

    //---- <Setup> ----
    // Receive response & update list user online when another user online
    this.socket.on(TAG.RESPONSE_USER_ONLINE, ({ user }) => {
      store.dispatch(action.LIST_USER.add(user));
    });

    // Receive response & update list user online when another user offline
    this.socket.on(TAG.RESPONSE_USER_OFFLINE, ({ user }) => {
      store.dispatch(action.LIST_USER.remove(user));
    });

    // Receive response & update list room online when another user create new room
    this.socket.on(TAG.RESPONSE_ADD_ROOM_ONLINE, ({ room }) => {
      store.dispatch(action.LIST_ROOM.add(room));
    });

    // Receive response & update list room online when room close (2 player quit room)
    this.socket.on(TAG.RESPONSE_REMOVE_ROOM_ONLINE, ({ room }) => {
      store.dispatch(action.LIST_ROOM.remove(room));
    });

    // Receive response & update list room online when another user become a player
    this.socket.on(
      TAG.RESPONSE_UPDATE_USER_IN_LISTROOM,
      ({ idRoom, idUser, idPlayer, username }) => {
        console.log("DATA:", { idRoom, idUser, idPlayer, username });
        store.dispatch(
          action.LIST_ROOM.updateInfoUser({
            idRoom,
            idUser,
            idPlayer,
            username,
          })
        );
      }
    );

    // Receive response & update list message in room
    // this.socket.on(TAG.RESPONSE_SEND_MESS, ({ mess }) => {
    // store.dispatch(action.LIST_ROOM.remove(room));
    // });

    //---- </Setup> ----

    return this.socket;
  }

  setCallback(tag, callback) {
    this.socket.on(tag, callback);
  }

  joinRoom(id) {
    this.socket.emit(TAG.REQUEST_JOIN_ROOM, { id });
  }

  leaveRoom(id) {
    this.socket.emit(TAG.REQUEST_LEAVE_ROOM, { id });
  }

  updateInfoUserInRoom(idRoom, idPlayer, idUser, username) {
    this.socket.emit(TAG.REQUEST_UPDATE_USER_IN_ROOM, {
      idRoom,
      idPlayer,
      idUser,
      username,
    });
  }

  // sendMess(mess) {
  //   this.socket.emit(TAG.REQUEST_JOIN_ROOM, { mess });
  // }

  updateListUserOnline(token) {
    this.socket.emit(TAG.REQUEST_USER_ONLINE, { token });
  }

  signOut(token) {
    this.socket.emit(TAG.REQUEST_USER_OFFLINE, { token });
  }

  sendMessage(idRoom, message, token) {
    this.socket.emit(TAG.REQUEST_SEND_MESS, { idRoom, message, token });
  }
};

const realtime = new Realtime();

export default realtime;
