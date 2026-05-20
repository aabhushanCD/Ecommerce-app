import axios from "axios";
import { ServerApi } from "@/constant";

const axiosInstance = axios.create({
  baseURL: ServerApi,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
