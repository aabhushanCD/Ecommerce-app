import { useCartStore } from "@/features/cart/cart.store";
import { useProductDetails } from "@/features/product/product.hook";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Shipping from "./Shipping";
import AddressCard from "./AddressCard";
import { Package, MapPin, Plus } from "lucide-react";
import { discount } from "@/utils/utils";

const CheckoutItems = ({ items }) => {
  const [search] = useSearchParams();
  const [newAddress, setNewAddress] = useState(false);

  const type = search.get("type");
  const quantity = search.get("quantity");
  const productId = search.get("productId");

  const selectedItem = useCartStore((state) => state.selectedItem);
  const { data } = useProductDetails(productId);

  let checkoutItems = items;

  if (type === "buyNow" && data?.data?.product) {
    checkoutItems = [
      {
        ...data.data.product,
        quantity,
      },
    ];
  } else {
    checkoutItems = [...selectedItem];
  }

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mt-10">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">
        Review Items & Shipping
      </h1>

      {/* ---------------- ITEMS SECTION ---------------- */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6 text-indigo-600 font-semibold">
          <Package size={20} />
          Order Items
        </div>

        <div className="space-y-6">
          {checkoutItems?.map((item) => (
            <div
              key={item._id || item.item._id}
              className="flex gap-6 items-center border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
            >
              {/* Image */}
              <img
                src={item?.image || item?.item?.image}
                alt={item?.name || item?.item?.name}
                className="w-24 h-24 object-cover rounded-lg border"
              />

              {/* Product Info */}
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    {item?.name || item?.item?.name}
                  </span>

                  <span className="text-sm text-gray-500">
                    Color: {item?.color || item?.item?.color}
                  </span>

                  <span className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </span>
                </div>

                {/* Price */}
                <div className="text-right">
                  <span className="text-lg font-semibold text-indigo-600">
                    Rs. {discount(item.item.price, item.item.discount)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- SHIPPING SECTION ---------------- */}

      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold">
            <MapPin size={20} />
            Shipping Address
          </div>

          <button
            onClick={() => setNewAddress(!newAddress)}
            className="flex items-center gap-2 text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus size={16} />
            {!newAddress ? "Add Address" : "My Addresses"}
          </button>
        </div>

        {/* Address Section */}

        <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
          {newAddress ? <Shipping /> : <AddressCard />}
        </div>
      </div>
    </div>
  );
};

export default CheckoutItems;
