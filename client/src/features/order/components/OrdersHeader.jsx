const OrdersHeader = () => (
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
);

export default OrdersHeader;
