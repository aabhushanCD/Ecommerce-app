import axiosInstance from "@/services/axiosInstance";

export const addAddress = async (data) => {
  return await axiosInstance.post("/address", data);
};

export const getAddress = async () => {
  return await axiosInstance.get("/address");
};

export const updateAddress = async ({ addressId, data }) => {
  return await axiosInstance.put(`/address/${addressId}`, data);
};

export const deleteAddress = async (addressId) => {
  return await axiosInstance.delete(`/address/${addressId}`);
};
