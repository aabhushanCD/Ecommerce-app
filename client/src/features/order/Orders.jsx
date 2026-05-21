import { Package, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSellerOrders } from "./order.hook";
import Loading from "@/components/customs/Loading";
import { useNavigate } from "react-router-dom";

const SellerOrdersTable = () => {
  const { isLoading, data, error } = useSellerOrders();
  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  // FIX 5: don't rely on custom Error swallowing children/className
  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load orders.
      </div>
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
      <div className="flex justify-between items-center py-10">
        <div>
          <h1 className="text-4xl font-bold">Order Management</h1>
          <p className="text-gray-500">
            Real-time oversight of your global fulfillment operations.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 border">Export CSV</button>
          <button className="px-4 py-2 border">Print Labels</button>
        </div>
      </div>

      {/* 📱 MOBILE VIEW */}
      <div className="grid gap-4 md:hidden">
        {data?.orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-4 shadow-sm bg-white space-y-2"
          >
            <div className="flex justify-between">
              <p className="font-medium text-sm">#{order._id.slice(-6)}</p>
              {/* FIX 4: use consistent field name */}
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
            </div>

            <p className="text-sm text-gray-600">
              {order.userId?.name || "Guest"}
            </p>

            {/* FIX 1: was order.items.updatedAt */}
            <p className="text-xs text-gray-500">Items: {order.items.length}</p>

            <p className="font-semibold text-sm">₹ {order.totalAmount}</p>

            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => navigate(`view/${order._id}`)}
            >
              View Order
            </Button>
          </div>
        ))}
      </div>

      {/* 💻 DESKTOP VIEW */}
      <div className="hidden md:block overflow-x-auto rounded-xl border bg-white shadow-sm">
        <div className="flex gap-4 px-4 py-4 border-b font-semibold text-gray-600">
          <button>ALL</button>
          <button>PENDING</button>
          <button>SHIPPED</button>
          <button>DELIVERED</button>
          <button>CANCELLED</button>
        </div>
        <table className="min-w-full text-sm">
          <thead className="border-b text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">ORDER ID</th>
              <th className="px-4 py-3 text-left">CUSTOMER NAME</th>
              <th className="px-4 py-3 text-left">DATE</th>
              <th className="px-4 py-3 text-left">TOTAL AMOUNT</th>
              <th className="px-4 py-3 text-left">STATUS</th>
              <th className="px-4 py-3 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-800">
                  #{order._id.slice(-6)}
                </td>
                <td className="px-4 py-3 font-semibold text-black">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 border rounded-full flex items-center justify-center bg-blue-400 text-white">
                      {order.userId?.name?.[0] ?? "?"}
                    </div>
                    {order.userId?.name || "Guest"}
                  </div>
                </td>
                {/* FIX 2: don't mutate order.updatedAt */}
                <td className="px-4 py-3 text-gray-500 font-semibold">
                  {new Date(order.updatedAt).toLocaleDateString()}
                </td>
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
          {/* FIX 3: pagination must be inside a valid table element */}
          <tfoot>
            <tr>
              <td colSpan={4} className="px-4 py-6 font-semibold">
                Showing {data?.orders.length} orders
              </td>
              <td className="">
                <button className="p-2 border mr-2">{"<"}</button>
                <button className="p-2 border mr-2">{"1"}</button>
                <button className="p-2 border mr-2">{">"}</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default SellerOrdersTable;
