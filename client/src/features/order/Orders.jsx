import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSellerOrderView } from "./order.hook";
import Loading from "@/components/customs/Loading";

const SellerOrdersTable = () => {
  const { isLoading, data, error } = useSellerOrderView();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">Failed to load orders .</p>
    );
  }

  if (data?.product?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
        <Package size={48} className="opacity-40 mb-3" />
        <p className="text-lg font-medium ">No orders yet</p>
        <p className="text-sm">Orders will appear here once customers buy</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              Order ID
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              Customer
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              Product
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              Quantity
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              Total
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              Status
            </th>
            <th className="px-4 py-3 text-center font-medium text-gray-600">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {data?.data.orders?.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 font-medium">#{order._id.slice(-6)}</td>

              <td className="px-4 py-3">{order.userId?.name || "Guest"}</td>

              <td className="px-4 py-3">{order.items.length}</td>

              <td className="px-4 py-3">{order.items.length}</td>

              <td className="px-4 py-3 font-semibold">₹ {order.totalAmount}</td>

              <td className="px-4 py-3">
                <Badge
                  variant={
                    order.status === "delivered"
                      ? "success"
                      : order.status === "cancelled"
                        ? "destructive"
                        : "outline"
                  }
                >
                  {order.paymentStatus}
                </Badge>
              </td>

              <td className="px-4 py-3 text-center">
                <Button size="sm" variant="outline">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerOrdersTable;
