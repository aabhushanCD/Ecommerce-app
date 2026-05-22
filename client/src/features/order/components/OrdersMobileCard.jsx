import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBadgeVariant, formatOrderId, formatDate } from "../utils";
import { useNavigate } from "react-router-dom";

const OrdersMobileCard = ({ order }) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white space-y-2">
      <div className="flex justify-between">
        <p className="font-medium text-sm">{formatOrderId(order._id)}</p>
        <Badge variant={getBadgeVariant(order.orderStatus)}>
          {order.orderStatus}
        </Badge>
      </div>
      <p className="text-sm text-gray-600">{order.userId?.name || "Guest"}</p>
      <p className="text-xs text-gray-500">Items: {order.items.length}</p>
      <p className="text-xs text-gray-500">{formatDate(order.updatedAt)}</p>
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
  );
};

export default OrdersMobileCard;
