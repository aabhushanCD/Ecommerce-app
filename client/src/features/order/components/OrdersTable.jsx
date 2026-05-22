import OrdersFilterTabs from "./OrdersFilterTabs";
import OrdersTableRow from "./OrdersTableRow";

const OrdersTable = ({ orders, activeFilter, onFilterChange }) => (
  <div className="hidden md:block overflow-x-auto rounded-xl border bg-white shadow-sm">
    <OrdersFilterTabs active={activeFilter} onChange={onFilterChange} />
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
        {orders.map((order) => (
          <OrdersTableRow key={order._id} order={order} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={6} className="px-4 py-6 font-semibold text-gray-500">
            Showing {orders.length} orders
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
);

export default OrdersTable;
