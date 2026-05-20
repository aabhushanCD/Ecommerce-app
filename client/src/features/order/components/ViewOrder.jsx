import React from "react";
import { useParams } from "react-router-dom";
import { useSellerOrderView } from "../order.hook";
import { discount } from "@/utils/utils";
import OrderSkeleton from "./OrderSkeleton";

const ViewOrder = () => {
  const { id: orderId } = useParams();

  const { data, isError, isLoading } = useSellerOrderView(orderId);

  const order = data?.order;

  const total = data?.order?.totalAmount;

  const getStatusColor = (status) => {
    switch (status) {
      case "Placed":
        return "bg-yellow-100 text-yellow-700";
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) return <OrderSkeleton />;
  if (isError) return <p>Error loading order</p>;
  if (!order) return <p>No order found</p>;
  const price = (price, percent) => discount(price, percent);
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full bg-white shadow-lg rounded-2xl p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Order Details</h2>

          <span
            className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
              order.orderStatus,
            )}`}
          >
            {order.orderStatus}
          </span>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p>
            <span className="font-medium">Order ID:</span> {order._id}
          </p>

          <p>
            <span className="font-medium">Total:</span> ₹{total}
          </p>
        </div>

        {/* Customer */}
        <div className="border rounded-xl p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Customer Info</h3>
          <p>{order.userId?.name}</p>
          <p className="text-gray-500">{order.userId?.email}</p>
        </div>

        {/* Items */}
        <div>
          <h3 className="font-semibold mb-3">Order Items</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border rounded-xl overflow-hidden">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {order.items?.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-3">{item.name || "Product"}</td>
                    <td className="p-3">₹{price(item.price, item.discount)}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">
                      ₹{price(item.price, item.discount) * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        {order.orderStatus === "Placed" && (
          <div className="flex justify-end gap-3 pt-4">
            <button className="px-5 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50">
              Cancel Order
            </button>

            <button className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;
