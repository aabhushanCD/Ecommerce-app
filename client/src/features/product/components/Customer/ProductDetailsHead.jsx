import StarRating from "@/components/StarRating";
import { discount } from "@/utils/utils";
import { Check, LucideShare2, ShoppingCart, Zap } from "lucide-react";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { HiOutlineChatAlt2 } from "react-icons/hi";

const SIZES = ["XS", "S", "M", "L", "XL"];

const COLORS = [
  { label: "53 Green", value: "bg-green-500" },
  { label: "Sky Blue", value: "bg-sky-400" },
  { label: "Rose", value: "bg-rose-400" },
  { label: "Amber", value: "bg-amber-400" },
];

const ProductDetailsHead = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const fixed = discount(product?.price, product?.discount);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4 lg:w-[45%]">
          <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200">
            {product?.images?.[selectedImage] ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <ShoppingCart className="w-16 h-16 opacity-30" />
                <span className="text-sm">No image available</span>
              </div>
            )}
          </div>
          <div className="flex gap-3 justify-center">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 rounded-lg bg-gray-100 border-2 overflow-hidden flex items-center justify-center transition-all ${
                  selectedImage === idx
                    ? "border-indigo-500 shadow-md"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                {product?.images?.[idx] ? (
                  <img
                    src={product.images[idx]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Title & Meta */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {product?.name ?? "Product Name"}
              </h1>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  wishlisted
                    ? "bg-rose-50 border-rose-400 text-rose-500"
                    : "border-gray-200 text-gray-400 hover:border-rose-300 hover:text-rose-400"
                }`}
              >
                <FaHeart className="text-sm" />
              </button>
            </div>

            <p className="mt-2 text-gray-500 text-sm leading-relaxed">
              A baseball-themed collection, a favorite of the Pearl friends.
            </p>

            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={5} />
              <span className="text-sm font-semibold text-gray-700">4.9</span>
              <span className="text-sm text-gray-400">·</span>
              <span className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">5k+</span> Sold
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mt-4">
              <span className="text-3xl font-bold text-gray-900">
                Rs. {fixed}
              </span>
              <span className="text-lg text-red-400 line-through mb-0.5">
                Rs. {product?.price}
              </span>
              {product?.discount && (
                <span className="mb-0.5 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Color Selector */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              Color:{" "}
              <span className="text-indigo-600">
                {COLORS[selectedColor].label}
              </span>
            </h2>
            <div className="flex gap-2">
              {COLORS.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(idx)}
                  className={`w-8 h-8 rounded-full ${color.value} border-2 transition-all ${
                    selectedColor === idx
                      ? "border-gray-800 scale-110 shadow-md"
                      : "border-transparent hover:scale-105"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              Size:{" "}
              <span className="text-indigo-600">
                {selectedSize ?? "Select a size"}
              </span>
            </h2>
            <div className="flex gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-11 h-11 rounded-lg border-2 text-sm font-semibold transition-all ${
                    selectedSize === size
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                      : "border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">Qty:</span>
            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-lg transition-colors"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold text-gray-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-lg transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-indigo-200">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button className="flex-1 h-12 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
              <Zap className="w-5 h-5" />
              Buy Now
            </button>
          </div>

          {/* Action Strip */}
          <div className="flex items-center border border-gray-200 rounded-xl divide-x divide-gray-200">
            {[
              {
                icon: <HiOutlineChatAlt2 className="w-4 h-4" />,
                label: "Chat",
              },
              { icon: <FaHeart className="w-4 h-4" />, label: "Wishlist" },
              {
                icon: <LucideShare2 className="w-4 h-4" />,
                label: "Share",
              },
            ].map(({ icon, label }) => (
              <button
                key={label}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 text-sm font-medium transition-colors first:rounded-l-xl last:rounded-r-xl"
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2">
            {["Free Returns", "Secure Payment", "Authentic Product"].map(
              (badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-3 py-2"
                >
                  <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-xs text-gray-600 font-medium">
                    {badge}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsHead;
