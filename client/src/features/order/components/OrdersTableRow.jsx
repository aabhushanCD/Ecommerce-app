import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatOrderId, getInitial, getBadgeVariant } from "../utils";

import { useNavigate } from "react-router-dom";
import { timeAgo } from "@/constant";

const OrdersTableRow = ({ order }) => {
  const navigate = useNavigate();
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 font-medium text-blue-800">
        {formatOrderId(order._id)}
      </td>
      <td className="px-4 py-3 font-semibold text-black">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-400 text-white">
            {getInitial(order.userId?.name)}
          </div>
          {order.userId?.name || "Guest"}
        </div>
      </td>
      <td className="px-4 py-3 text-gray-500">{timeAgo(order.updatedAt)}</td>
      <td className="px-4 py-3 font-semibold">₹ {order.totalAmount}</td>
      <td className="px-4 py-3">
        <Badge variant={getBadgeVariant(order.orderStatus)}>
          {order.orderStatus}
        </Badge>
      </td>
      <td className="px-4 py-3 text-center">
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`/seller/orders/view/${order._id}`)}
        >
          View
        </Button>
      </td>
    </tr>
  );
};

export default OrdersTableRow;
