import OrdersMobileCard from "./OrdersMobileCard";

const OrdersMobileList = ({ orders }) => (
  <div className="grid gap-4 md:hidden">
    {orders.map((order) => (
      <OrdersMobileCard key={order._id} order={order} />
    ))}
  </div>
);

export default OrdersMobileList;
