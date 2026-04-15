import axiosInstance from "@/services/axiosInstance";

export const sellerOrders = async () => {
  const res = await axiosInstance.get("/order/get/all");
  return res.data;
};

export const sellerOrderView = async (orderId) => {

  const res = await axiosInstance.get(`/order/get/orderId/${orderId}`);
  return res.data;
};
