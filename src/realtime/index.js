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

    //---- </Setup> ----

    return this.socket;
  }

  updateListUserOnline(token) {
    this.socket.emit(TAG.REQUEST_USER_ONLINE, { token });
  }

  signOut(token) {
    this.socket.emit(TAG.REQUEST_USER_OFFLINE, { token });
  }
};

const realtime = new Realtime();

export default realtime;
