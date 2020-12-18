import TAG from "../../TAG";

const INITIAL_STATE = {
  fullName: "",
  id: "",
};

const profileReducer = (profile = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.UPDATE:
      return profile;
    default:
      return profile;
  }
};

export default profileReducer;
