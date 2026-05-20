import { useQuery, useQueryClient } from "@tanstack/react-query";
import { sellerOrders, sellerOrderView } from "./order.service";

export const useSellerOrders = () => {
  return useQuery({
    queryKey: ["seller-orders"],
    queryFn: sellerOrders,
  });
};


// This hook is used in the ViewOrder component to fetch the details of a specific order. It first checks if the order details are already available in the cache (from the list of seller orders) and returns that data if found. If not, it makes an API call to fetch the order details.
export const useSellerOrderView = (orderId) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["orderView", orderId],
    enabled: !!orderId,
    queryFn: () => sellerOrderView(orderId),

    initialData: () => {
      const ordersData = queryClient.getQueryData(["seller-orders"]);

      const orders = ordersData?.orders || [];

      const found = orders.find((o) => o._id === orderId);

      return found ? { data: found } : undefined;
    },
 
  });

}

// export const useHandleAction = () => {
//   const handleConfirm =async(orderId) => {
//   try {
//     const res = await 
//   } catch (error) {
    
//   }

// }
// return  handleConfirm;
// }