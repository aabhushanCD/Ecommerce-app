import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSellerOrders } from "./order.hook";
import Loading from "@/components/customs/Loading";
import Error from "@/components/customs/Error";
import { useNavigate } from "react-router-dom";

const SellerOrdersTable = () => {
  const { isLoading, data, error } = useSellerOrders();

  const navigate = useNavigate();
  if (isLoading) return <Loading />;

  if (error) {
    return (
      <Error className="text-center text-red-500 mt-10">
        Failed to load orders.
      </Error>
    );
  }

  if (data?.orders?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
        <Package size={48} className="opacity-40 mb-3" />
        <p className="text-lg font-medium">No orders yet</p>
        <p className="text-sm">Orders will appear here once customers buy</p>
      </div>
    );
  }

  return (
    <div className="w-full px-2 md:px-4">
      <h1 className="text-4xl font-bold py-10">Order Management</h1>
      {/* 📱 MOBILE VIEW */}
      <div className="grid gap-4 md:hidden">
        {data?.orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-4 shadow-sm bg-white space-y-2"
          >
            <div className="flex justify-between">
              <p className="font-medium text-sm">#{order._id.slice(-6)}</p>

              <Badge
                variant={
                  order.status === "delivered"
                    ? "success"
                    : order.status === "cancelled"
                      ? "destructive"
                      : "outline"
                }
              >
                {order.status}
              </Badge>
            </div>

            <p className="text-sm text-gray-600">
              {order.userId?.name || "Guest"}
            </p>

            <p className="text-xs text-gray-500">Items: {order.items.length}</p>

            <p className="font-semibold text-sm">₹ {order.totalAmount}</p>

            <Button size="sm" variant="outline" className="w-full">
              View Order
            </Button>
          </div>
        ))}
      </div>

      {/* 💻 TABLE VIEW */}
      <div className="hidden md:block overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data?.orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">
                  #{order._id.slice(-6)}
                </td>

                <td className="px-4 py-3">{order.userId?.name || "Guest"}</td>

                <td className="px-4 py-3">{order.items.length}</td>

                <td className="px-4 py-3 font-semibold">
                  ₹ {order.totalAmount}
                </td>

                <td className="px-4 py-3">
                  <Badge
                    variant={
                      order.orderStatus === "delivered"
                        ? "success"
                        : order.orderStatus === "cancelled"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {order.orderStatus}
                  </Badge>
                </td>

                <td className="px-4 py-3 text-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`view/${order._id}`)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrdersTable;
