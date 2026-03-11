import axiosInstance from "@/services/axiosInstance";



export const viewCartProduct = async () => {
  await axiosInstance.get("/cart/view/product");
};

export const addCart = async (data) => {
  await axiosInstance.post("/cart/add/product", data);
};

export const deleteCartProduct = async (productId) => {
  await axiosInstance.delete(`/cart/remove/${productId}`);
};
