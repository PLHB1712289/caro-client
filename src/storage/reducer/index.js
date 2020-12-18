import { combineReducers } from "redux";
import boardReducer from "./sevice/board";
import profileReducer from "./sevice/profile";
import loadingReducer from "./sevice/loading";
import tokenReducer from "./sevice/token";
import listGameReducer from "./sevice/listGame";
import listUserReducer from "./sevice/listUser";

const reducer = combineReducers({
  board: boardReducer,
  profile: profileReducer,
  loading: loadingReducer,
  token: tokenReducer,
  listGame: listGameReducer,
  listUser: listUserReducer,
});

export default reducer;
