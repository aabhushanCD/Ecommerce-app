const OrderSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center animate-pulse">
      <div className="w-full bg-white shadow-lg rounded-2xl p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="h-6 w-40 bg-gray-200 rounded"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-4 w-60 bg-gray-200 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>

        {/* Customer */}
        <div className="border rounded-xl p-4 bg-gray-50 space-y-2">
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>

        {/* Table */}
        <div className="space-y-3">
          <div className="h-5 w-32 bg-gray-200 rounded"></div>

          {[1, 2, 3].map((i) => (
            <div key={i} className="grid grid-cols-4 gap-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderSkeleton;
