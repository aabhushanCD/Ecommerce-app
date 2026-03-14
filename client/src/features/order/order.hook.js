import { useQuery } from "@tanstack/react-query";
import { sellerOrderView } from "./order.service";

export const useSellerOrderView = () => {
  return useQuery({
    queryKey: ["seller-orders"],
    queryFn: () => sellerOrderView,
  });
};
