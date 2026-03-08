import axiosInstance from "@/services/axiosInstance";

/**
 * @name getProducts
 * @description This function is use to get the product
 * @url /api/product/view/
 * @method get
 * @param params is may required like limit, page, skip
 * @returns all the products data
 * @access customer, vendor , admin
 */
export const getProducts = async (params) => {
  return await axiosInstance.get("/product/view", params);
};

/**
 * @name addProduct
 * @description used to add the product by the vendor
 * @param {*} data
 * @returns
 * @access vendor
 */
export const addProduct = async (data) => {
  return await axiosInstance.post("/product/add-product", data);
};

/**
 * @name deleteProduct
 * @description used to delete the product by the vendor and admin
 * @param {*} data
 * @returns
 * @access vendor,admin
 */
export const deleteProduct = async (id) => {
  return await axiosInstance.delete(`/product/${id}`);
};

/**
 * @name allMyProducts
 * @description used to get all the products of the vendor
 * @param {*} data
 * @returns produts
 * @access vendor
 */
export const getAllMyProducts = async () => {
  return await axiosInstance.get(`/product/myProducts`);
};

export const getProductDetails = async (productId) => {
  return await axiosInstance.get(`/product/${productId}`);
};


