import axios from "../data/client";

// Login function
export const authLogin = async (email: string, password: string) => {
  const response = await axios.post("/auth/login", { email, password });
  return response.data;
};

export const logout = async () => {
  const response = await axios.get("/auth/logout");
  return response.data;
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  passwordConfirm: string
) => {
  const response = await axios.patch("/auth/password", {
    oldPassword,
    newPassword,
    passwordConfirm,
  });
  return response.data;
};
