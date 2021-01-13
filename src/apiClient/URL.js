const _URL = {
  GET_ROOM_USER_ONLINE: "/anonymous",

  SIGN_IN_WITH_FB: "/auth/sign-in/facebook",
  SIGN_IN_WITH_GG: "/auth/sign-in/google",
  SIGN_IN: "/auth/sign-in",
  GET_USER:"/auth/profile",
  GET_USER_LIST_RANK:"/auth/listUserRank",

  UPDATE_USER:"/auth/update",
  USER_BY_ID:"/auth/get-user-by-id",
  CHANGE_PASSWORD:"/auth/change-password",
  FORGOT_PASSWORD:"/auth/forgot-password",
  GET_USER: "/auth/profile",
  UPDATE_USER: "/auth/update",
  USER_BY_ID: "/auth/get-user-by-id",
  CHANGE_PASSWORD: "/auth/change-password",
  FORGOT_PASSWORD: "/auth/forgot-password",
  NEW_ROOM: "/game/new-room",
  GET_ROOM: "/game/room",
  GET_GAME: "/game/get-game",

  NEW_GAME: "/game/newGame",
  LIST_GAME: "/game/listGame",
  ACCESS_GAME: "/game/accessGame",
  SEND_MESSAGE: "/game/message",
  GET_MESSAGE: "/game/message",
};

const URL = { ..._URL };

export default URL;
