import axiosInstance from "@/services/axiosInstance";

export const Login = async (data) => {
  return await axiosInstance.post("/auth/login", data);
};

export const signup = async (data) => {
  return await axiosInstance.post("/auth/register", data);
};

export const logout = async () => {
  return await axiosInstance.post("/auth/logout");
};

export const authMe = async () => {
  return await axiosInstance.get("/auth/me");
};
