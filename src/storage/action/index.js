import token from "./service/token";
import loading from "./service/loading";
import listRoom from "./service/listRoom";
import listUser from "./service/listUser";

const action = {
  TOKEN: token,
  LOADING: loading,
  LIST_ROOM: listRoom,
  LIST_USER: listUser,
};

export default action;
