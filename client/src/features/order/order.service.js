import axiosInstance from "@/services/axiosInstance";

export const sellerOrders = async () => {
  const res = await axiosInstance.get("/order/get/all");
  return res.data;
};

export const sellerOrderView = async (orderId) => {
  const res = await axiosInstance.get(`/order/get/orderId/${orderId}`);
  return res.data;
};

export const confirmOrder = async (orderId) => {
  try {
    const res = await axiosInstance.put(
      `/order/confirmed/by/seller/${orderId}`,
    );
    return res.data;
  } catch (error) {
    console.error("Error confirming order:", error);
    throw error;
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const res = await axiosInstance.put(`/order/cancel/by/seller/${orderId}`);
    return res.data;
  } catch (error) {
    console.error("Error canceling order:", error);
    throw error;
  }
};
