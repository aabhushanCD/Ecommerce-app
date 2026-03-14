import React, { useEffect, useState } from "react";
import { User, MapPin, Globe, Home, Edit, Trash2 } from "lucide-react";
import { useAddress } from "@/features/user/address.hook";

const AddressCard = ({ onEdit }) => {
  const { fetchAddress, address, removeAddress } = useAddress();

  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleDelete = async (id) => {
    await removeAddress(id);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium">Select Shipping Address</h1>
      {address.map((item) => (
        <div
          key={item._id}
          className={`bg-white border rounded-xl p-5 shadow-sm transition hover:shadow-md
              ${
                selectedAddress === item._id
                  ? "border-indigo-500 ring-1 ring-indigo-200"
                  : "border-gray-200"
              }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              {/* Radio Button */}
              <input
                type="radio"
                name="selectedAddress"
                checked={selectedAddress === item._id}
                onChange={() => setSelectedAddress(item._id)}
                className="accent-indigo-600 cursor-pointer"
              />

              <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                <Home size={18} />
                <span>{item.type} Address</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onEdit(item)}
                className="flex  items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition"
              >
                <Edit size={16} />
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="flex items-center gap-3 text-gray-800 font-medium mb-2">
            <User size={16} className="text-indigo-500" />
            {item.fullName}
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 text-gray-600 mb-2">
            <MapPin size={16} className="text-indigo-500 mt-1" />
            <div className="leading-relaxed">
              {item.street}, {item.area} <br />
              {item.city}, {item.state}
            </div>
          </div>

          {/* Country */}
          <div className="flex items-center gap-3 text-gray-600">
            <Globe size={16} className="text-indigo-500" />
            {item.country}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressCard;
