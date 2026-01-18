import React from "react";

const SidebarItem = ({ icon, text, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
      active
        ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md"
        : "hover:bg-gray-100 text-gray-700"
    }`}
  >
    {icon}
    {text}
  </div>
);

export default SidebarItem;
