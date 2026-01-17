import React from "react";

const ProductCart = ({ item, discountedPrice }) => {
  return (
    <div
      key={item._id}
      className="w-55 bg-white rounded-xl border shadow-sm 
                       hover:shadow-lg transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative w-full h-45 overflow-hidden rounded-t-xl">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount badge */}
        <span
          className="absolute top-2 left-2 bg-red-500 text-white 
                               text-xs px-2 py-1 rounded-md"
        >
          -{item.discount}%
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="font-medium text-gray-800">{item.name}</p>

        <div className="mt-1 flex items-center gap-2">
          <p className="text-lg font-semibold text-green-600">
            Rs. {discountedPrice(item.price, item.discount)}
          </p>
          <p className="text-sm line-through text-gray-400">Rs. {item.price}</p>
        </div>

        <button
          className="mt-3 w-full bg-black text-white py-2 rounded-lg
                           text-sm hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
