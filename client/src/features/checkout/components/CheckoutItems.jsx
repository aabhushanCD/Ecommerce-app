import React, { useState } from "react";
import Shipping from "./Shipping";
import AddressCard from "./AddressCard";
import { Package, MapPin, Plus, CreditCard, Truck } from "lucide-react";
import { discount } from "@/utils/utils";
import { useCheckout } from "./checkout.hook";
import { FaMoneyBill } from "react-icons/fa";

const CheckoutItems = () => {
  const [newAddress, setNewAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { structuredData, handlePlacedOrder } = useCheckout();

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-8 mt-10">
      {/* LEFT SECTION */}
      <div className="space-y-8">
        {/* ORDER ITEMS */}
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-6">
            <Package size={20} />
            Order Items
          </div>

          <div className="space-y-5">
            {structuredData?.items?.map((item) => (
              <div
                key={item.productId}
                className="flex gap-5 items-center border rounded-lg p-4 hover:shadow-sm transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />

                <div className="flex justify-between w-full">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {item.name}
                    </span>

                    <span className="text-sm text-gray-500">
                      Color: {item.color}
                    </span>

                    <span className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </span>
                  </div>

                  <div className="font-semibold text-indigo-600">
                    Rs. {discount(item.price, item.discount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SHIPPING ADDRESS */}
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold">
              <MapPin size={20} />
              Shipping Address
            </div>

            <button
              onClick={() => setNewAddress(!newAddress)}
              className="flex items-center gap-2 text-sm bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              <Plus size={16} />
              {!newAddress ? "Add Address" : "My Addresses"}
            </button>
          </div>

          <div className="bg-gray-50 border rounded-md p-4">
            {newAddress ? (
              <Shipping />
            ) : (
              <AddressCard
                setSelectedAddress={setSelectedAddress}
                selectedAddress={selectedAddress}
              />
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION - PAYMENT AND ORDER SUMMARY */}
      <div className="bg-white border rounded-lg p-6 shadow-sm h-fit sticky top-20">
        {/* PAYMENT METHOD */}
        <div className="  rounded-lg pb-6 ">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-6">
            <CreditCard size={20} />
            Payment Method
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-3 border rounded-md p-4 cursor-pointer hover:border-indigo-400">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Truck size={18} />
              <span className="font-medium text-gray-700">
                Cash on Delivery
              </span>
            </label>
            <label className="flex items-center gap-3 border rounded-md p-4 cursor-pointer hover:border-indigo-400">
              <input
                type="radio"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FaMoneyBill size={18} />
              <span className="font-medium text-gray-700">Esewa / Khalti</span>
            </label>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Order Summary
        </h2>

        <div className="space-y-4 text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs. {structuredData?.subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Rs. {structuredData?.shipping}</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span>Rs. {structuredData?.total}</span>
          </div>
        </div>

        <button
          onClick={() => handlePlacedOrder({ paymentMethod, selectedAddress })}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition font-semibold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutItems;
