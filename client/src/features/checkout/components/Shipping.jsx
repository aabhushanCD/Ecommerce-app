import React from "react";
import {
  Home,
  Building2,
  MapPin,
  Globe,
  Map,
  Navigation,
  Landmark,
  User,
} from "lucide-react";
import { useAddress } from "@/features/user/address.hook";

const Shipping = () => {
  const { createAddress } = useAddress();

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get("fullName"),
      type: formData.get("type"),
      country: formData.get("country"),
      city: formData.get("city"),
      state: formData.get("state"),
      street: formData.get("street"),
      area: formData.get("area"),
    };
    try {
      const res = await createAddress(data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-3xl mx-auto  bg-white shadow-lg rounded-2xl p-8 border">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="text-green-600" />
        <h1 className="text-2xl font-semibold text-gray-800">
          Shipping Address
        </h1>
      </div>

      <form className="space-y-6" onSubmit={handleAdd}>
        {/* Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
            <User size={16} /> Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Address Type */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Address Type
          </label>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer hover:border-green-500">
              <input type="radio" name="type" value="home" />
              <Home size={16} />
              Home
            </label>

            <label className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer hover:border-green-500">
              <input type="radio" name="type" value="office" />
              <Building2 size={16} />
              Office
            </label>
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
            <Globe size={16} /> Country
          </label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* City + State */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
              <Map size={16} /> City
            </label>
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
              <Landmark size={16} /> State
            </label>
            <input
              type="text"
              name="state"
              placeholder="State"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Street */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
            <Navigation size={16} /> Street
          </label>
          <input
            type="text"
            name="street"
            placeholder="Street / Ward / Local area"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Area */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Area / Landmark
          </label>
          <input
            type="text"
            name="area"
            placeholder="Nearby landmark"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
