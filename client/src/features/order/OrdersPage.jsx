import { useState } from "react";
import { Package } from "lucide-react";
import { useSellerOrders } from "./order.hook";
import Loading from "@/components/customs/Loading";
import OrdersHeader from "./components/OrdersHeader";
import OrdersMobileList from "./components/OrdersMobileList";
import OrdersTable from "./components/OrdersTable";

const OrdersPage = () => {
  const { isLoading, data, error } = useSellerOrders();
  const [activeFilter, setActiveFilter] = useState("ALL");

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load orders.
      </div>
    );
  if (!data?.orders?.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
        <Package size={48} className="opacity-40 mb-3" />
        <p className="text-lg font-medium">No orders yet</p>
        <p className="text-sm">Orders will appear here once customers buy</p>
      </div>
    );

  const filteredOrders =
    activeFilter === "ALL"
      ? data.orders
      : data.orders.filter((o) => o.orderStatus.toUpperCase() === activeFilter);

  return (
    <div className="w-full px-2 md:px-4">
      <OrdersHeader />
      <OrdersMobileList orders={filteredOrders} />
      <OrdersTable
        orders={filteredOrders}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
    </div>
  );
};

export default OrdersPage;
