import React from "react";
import { Package } from "lucide-react";

const ProductCart = ({ item, discountedPrice }) => {
  const imageUrl = item.imageUrls?.[0];

  return (
    <div
      className="w-55 bg-white rounded-xl border shadow-sm
                 hover:shadow-lg transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative w-full h-45 overflow-hidden rounded-t-xl bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Package size={40} className="text-gray-400" />
        )}

        {/* Discount badge */}
        {item.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
            -{item.discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-1">
        <p className="font-medium text-gray-800 line-clamp-1">{item.name}</p>

        <p className="text-xs text-gray-500">{item.category?.name}</p>

        <div className="flex items-center gap-2 mt-1">
          <p className="text-lg font-semibold text-green-600">
            Rs. {discountedPrice(item.price, item.discount)}
          </p>

          {item.discount > 0 && (
            <p className="text-sm line-through text-gray-400">
              Rs. {item.price}
            </p>
          )}
        </div>

        <button
          disabled={!item.isAvailable}
          className={`mt-3 w-full py-2 rounded-lg text-sm transition
            ${
              item.isAvailable
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {item.isAvailable ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
