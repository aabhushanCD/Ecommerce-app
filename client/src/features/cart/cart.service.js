import axiosInstance from "@/services/axiosInstance";

export const viewCartProduct = async () => {
  return await axiosInstance.get("/cart/view/product");
};

export const addCart = async (data) => {
  return await axiosInstance.post("/cart/add/product", data);
};

export const deleteCartProduct = async (productId) => {
  return await axiosInstance.delete(`/cart/remove/${productId}`);
};
