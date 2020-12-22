import TAG from "../../TAG";

const INITIAL_STATE = false;

const loadingReducer = (isLoading = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.LOADING.TURN_ON:
      return true;
    case TAG.LOADING.TURN_OFF:
      return false;

    default:
      return isLoading;
  }
};

export default loadingReducer;
