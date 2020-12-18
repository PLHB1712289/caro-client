import axiosCLient from "../../apiClient";

const POST_signUp = async (userInfo) => {
  const url = "/auth/sign-up";
  return axiosCLient.post(url, userInfo);
};

export default POST_signUp;
