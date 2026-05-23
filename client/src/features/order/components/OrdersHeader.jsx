const OrdersHeader = () => (
  <div className="flex justify-between items-center py-10">
    <div>
      <h1 className="text-2xl font-ssemibold">Order Management</h1>
      <p className="text-gray-500">
        Real-time oversight of your global fulfillment operations.
      </p>
    </div>
    <div className="flex gap-4">
      <button className="px-4 py-2 border rounded-2xl hover:bg-orange-800 bg-blue-200 hover:text-white transition-colors duration-600">
        Export CSV
      </button>
      <button className="px-4 py-2 border rounded-2xl hover:bg-orange-800 hover:text-white transition-colors duration-600 ">
        Print Labels
      </button>
    </div>
  </div>
);

export default OrdersHeader;
