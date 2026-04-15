import { useQueryClient, useQuery } from "@tanstack/react-query";
import { sellerOrders, sellerOrderView } from "./order.service";

export const useSellerOrders = () => {
  return useQuery({
    queryKey: ["seller-orders"],
    queryFn: sellerOrders,
  });
};

export const useSellerOrderView = (orderId) => {
  // const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["orderView", orderId],
    
    queryFn: () => sellerOrderView(orderId),

    // initialData: () => {
    //   const ordersData = queryClient.getQueryData(["seller-orders"]);

    //   const orders = ordersData?.orders || [];

    //   const found = orders.find((o) => o._id === orderId);

    //   return found ? { data: found } : undefined;
    // },

    // optional
  });
};
