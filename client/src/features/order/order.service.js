import axiosInstance from "@/services/axiosInstance";

export const sellerOrderView = async () => {
  return await axiosInstance.get("/order/view");
};


