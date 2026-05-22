import { ORDER_FILTERS } from "../constants";

const OrdersFilterTabs = ({ active, onChange }) => (
  <div className="flex gap-4 px-4 py-4   border-b font-semibold text-gray-600">
    {ORDER_FILTERS.map((filter) => (
      <button
        key={filter}
        onClick={() => onChange(filter)}
        className={`${active === filter ? "text-black underline" : ""} `}
      >
        {filter}
      </button>
    ))}
  </div>
);

export default OrdersFilterTabs;
