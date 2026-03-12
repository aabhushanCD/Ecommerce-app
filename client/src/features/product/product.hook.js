import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProduct,
  getAllMyProducts,
  getProductDetails,
  getProducts,
} from "./product.api";

/**
 * @name useProducts
 * @description get all public products
 */
export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });

/**
 * @name useGetAllMyProducts
 * @description get vendor/admin products
 */
export const useGetAllMyProducts = () =>
  useQuery({
    queryKey: ["my-products"],
    queryFn: getAllMyProducts,
    staleTime: 1000 * 60 * 5,
  });

/**
 * @name useDeleteProduct
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
    },
  });
};

export const useProductDetails = (productId) =>
  useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductDetails(productId),
    enabled: !!productId,
  });
