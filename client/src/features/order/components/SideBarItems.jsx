import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon, text, badge, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
        isActive
          ? "bg-linear-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg scale-105"
          : "hover:bg-gray-100 text-gray-700 hover:scale-102"
      }`
    }
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium">{text}</span>
    </div>

    {badge > 0 && (
      <span
        className={`text-xs px-2 py-1 rounded-full font-medium ${"bg-white/20 text-white"}`}
      >
        {badge}
      </span>
    )}
  </NavLink>
);
export default SidebarItem;
