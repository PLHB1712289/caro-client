const _URL = {
  GET_ROOM_USER_ONLINE: "/anonymous",

  SIGN_IN_WITH_FB: "/auth/sign-in/facebook",
  SIGN_IN_WITH_GG: "/auth/sign-in/google",
  SIGN_IN: "/auth/sign-in",

  NEW_ROOM: "/game/new-room",

  NEW_GAME: "/game/newGame",
  LIST_GAME: "/game/listGame",
  ACCESS_GAME: "/game/accessGame",
  SEND_MESSAGE: "/game/message",
  GET_MESSAGE: "/game/message",
};

const URL = { ..._URL };

export default URL;
