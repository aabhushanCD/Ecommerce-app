import React from "react";
import { User, MapPin, Globe, Home, Edit } from "lucide-react";

const AddressCard = ({ address, onEdit }) => {
  return (
    <div className="w-full pb-4">
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Home size={18} className="text-indigo-500" />
            Delivery Address
          </h2>

          <button
            onClick={() => onEdit(address)}
            className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <Edit size={16} />
            Edit
          </button>
        </div>

        {/* Address Info */}
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <User size={16} className="text-gray-500" />
            <span className="font-medium">{address?.fullName}</span>
          </div>

          <div className="flex items-center gap-3">
            <Globe size={16} className="text-gray-500" />
            <span>{address?.country}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-gray-500" />
            <span>
              {address?.city}, {address?.state}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-gray-500" />
            <span>
              {address?.area}, {address?.street}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Home size={16} className="text-gray-500" />
            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">
              {address?.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
