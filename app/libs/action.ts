import axios from "axios";

const signUpNewUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post("/api/users/signup", data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const loginUser = async (data: { email: string; password: string }) => {
  try {
    const res = await axios.post("/api/users/login", data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getUser = async () => {
  try {
    const res = await axios.get("/api/users/me");
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const logoutUser = async () => {
  try {
    const res = await axios.get("/api/users/logout");
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const forgotPassword = async (data: { email: string }) => {
  try {
    const res = await axios.post("/api/users/forgotpassword", data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const resetPassword = async (data: { password: string; token: string }) => {
  try {
    const res = await axios.patch("/api/users/resetpassword", data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const uploadUserPhoto = async (formData: FormData) => {
  try {
    const res = await axios.post("/api/users/upload", formData);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const updateUser = async (
  id: string,
  data: { password: string; image: string; name: string }
) => {
  try {
    const res = await axios.patch(`/api/users/me/${id}`, data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getUserInfo = async (id: string) => {
  try {
    const res = await axios.get(`/api/users/me/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export {
  signUpNewUser,
  getUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  uploadUserPhoto,
  updateUser,
  getUserInfo,
};
