import axiosInstance from "@/services/axiosInstance";

export const placedOrder = async (data) => {
  return await axiosInstance.post("/checkout/placedOrder", data);
};

export const buyNow = async (data) => {
  return await axiosInstance.post("/checkout/buyNow", data);
};
