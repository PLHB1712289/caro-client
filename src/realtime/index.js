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

    // setup
    this.socket.on(TAG.RESPONSE_USER_ONLINE, ({ user }) => {
      store.dispatch(action.LIST_USER.add(user));
    });

    this.socket.on(TAG.RESPONSE_USER_OFFLINE, ({ user }) => {
      store.dispatch(action.LIST_USER.remove(user));
    });

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
