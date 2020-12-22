import { combineReducers } from "redux";
import boardReducer from "./sevice/board";
import profileReducer from "./sevice/profile";
import loadingReducer from "./sevice/loading";
import tokenReducer from "./sevice/token";
import listRoomReducer from "./sevice/listRoom";
import listUserReducer from "./sevice/listUser";

const reducer = combineReducers({
  board: boardReducer,
  profile: profileReducer,
  loading: loadingReducer,
  token: tokenReducer,
  listRoom: listRoomReducer,
  listUser: listUserReducer,
});

export default reducer;
