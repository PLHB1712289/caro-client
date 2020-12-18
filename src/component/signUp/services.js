import POST_signUp from "./API";

const signUp = async (userInfo) => {
  return POST_signUp(userInfo);
};

export default signUp;
