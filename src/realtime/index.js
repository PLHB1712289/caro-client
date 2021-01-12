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

    // Receive response & update status room online
    this.socket.on(TAG.RESPONSE_UPDATE_STATUS_ROOM, ({ room }) => {
      // console.log("UPDATE STATUS ROOM:", room);
      store.dispatch(action.LIST_ROOM.updateStatusRoom(room));
    });

    // Receive response & update list room online when another user become a player
    this.socket.on(
      TAG.RESPONSE_UPDATE_USER_IN_LISTROOM,
      ({ idRoom, player1, player2 }) => {
        store.dispatch(
          action.LIST_ROOM.updateInfoUser({
            idRoom,
            player1,
            player2,
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

  removeCallback(tag) {
    this.socket.removeListener(tag);
  }

  joinRoom(id) {
    this.socket.emit(TAG.REQUEST_JOIN_ROOM, { id });
  }

  leaveRoom(id) {
    this.socket.emit(TAG.REQUEST_LEAVE_ROOM, { id });
  }

  newGame(idRoom, idPlayer1, idPlayer2) {
    this.socket.emit(TAG.REQUEST_NEW_GAME, { idRoom, idPlayer1, idPlayer2 });
  }

  updateInfoUserInRoom(idRoom, player1, player2) {
    console.log("UPDATE INFO USER IN ROOM");
    console.log({ player1, player2 });

    this.socket.emit(TAG.REQUEST_UPDATE_USER_IN_ROOM, {
      idRoom,
      player1,
      player2,
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

  makeMove(index) {
    this.socket.emit(TAG.REQUEST_MOVE, { index });
  }

  quickPlay() {
    this.socket.emit(TAG.REQUEST_QUICK_PLAY);
  }

  cancelQuickPlay() {
    this.socket.emit(TAG.REQUEST_CANCEL_QUICK_PLAY);
  }
};

const realtime = new Realtime();

export default realtime;
