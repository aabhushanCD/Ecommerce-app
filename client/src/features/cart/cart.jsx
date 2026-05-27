import React, { useEffect, useState } from "react";
import { useCartStore } from "./cart.store";
import { discount } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Bookmark,
  Tag,
  ShieldCheck,
  RotateCcw,
  Truck,
  ShoppingBag,
} from "lucide-react";

const Cart = () => {
  const { cartItems, removeItem, viewCart, loading } = useCartStore();
  const selectedItem = useCartStore((state) => state.selectedItem);
  const setSelectedItem = useCartStore((state) => state.setSelectedItem);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    viewCart();
  }, [viewCart]);

  const handleChoose = (data) => {
    setSelectedItem((prev) => {
      const exists = prev.find((item) => item.item._id === data.item._id);
      if (exists) return prev.filter((item) => item.item._id !== data.item._id);
      return [...prev, data];
    });
  };

  const subtotal = selectedItem.reduce((acc, item) => {
    const price = discount(item.item.price, item.item.discount);
    return acc + price * item.quantity;
  }, 0);

  const tax = +(subtotal * 0.08).toFixed(2);
  const grandTotal = +(subtotal + tax).toFixed(2);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-400 text-base">Loading cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4 px-4">
        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-medium text-gray-900">
          Your cart is empty
        </h1>
        <p className="text-sm text-green-800 text-center max-w-xs leading-relaxed">
          Looks like you haven't added anything to your bag yet. Start exploring
          our latest collections to find something you love.
        </p>
        <div className="flex gap-3 mt-2">
          <button className="px-4 py-2 text-sm bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors">
            Browse New Arrivals
          </button>
          <button className="px-4 py-2 text-sm bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors">
            Explore Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* Left: Cart Items */}
        <section>
          <h1 className="text-2xl font-medium text-gray-900 mb-5">
            Your Shopping Bag{" "}
            <span className="text-gray-400 font-normal text-lg">
              ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
            </span>
          </h1>

          <div className="flex flex-col gap-3">
            {cartItems.map((item, index) => {
              const discountedPrice = discount(
                item.item.price,
                item.item.discount,
              );
              const isSelected = selectedItem.some(
                (i) => i.item._id === item.item._id,
              );

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl border transition-all duration-200 p-5 flex gap-4 ${
                    isSelected
                      ? "border-green-300 shadow-sm shadow-green-100"
                      : "border-gray-100"
                  }`}
                >
                  {/* Image */}
                  <img
                    src={item.item?.imageUrls[0].url}
                    alt={item.item.name}
                    className="w-20 h-20 rounded-lg object-cover bg-gray-100 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-base font-medium text-gray-900 truncate">
                        {item.item.name}
                      </p>
                      <span className="text-base font-semibold text-green-600 whitespace-nowrap">
                        Rs. {(discountedPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    {item.item.color && (
                      <p className="text-sm text-gray-400">
                        Color: {item.item.color}
                      </p>
                    )}
                    {item.item.size && (
                      <p className="text-sm text-gray-400">
                        Size: {item.item.size}
                      </p>
                    )}

                    {item.item.discount > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full w-fit mt-1">
                        <Tag className="w-3 h-3" />
                        {item.item.discount}% OFF applied
                      </span>
                    )}

                    {/* Actions Row */}
                    <div className="flex items-center gap-4 mt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5">
                        <span className="text-xs text-gray-400">Qty</span>
                        <span className="text-sm font-medium text-gray-800">
                          {item.quantity}
                        </span>
                      </div>

                      {/* Select checkbox */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleChoose(item)}
                          className="w-4 h-4 accent-green-600 cursor-pointer"
                        />
                        <span className="text-sm text-gray-500">Select</span>
                      </label>

                      <div className="flex items-center gap-3 ml-auto">
                        <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                          <Bookmark className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            Save for Later
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            removeItem({
                              productId: item.item._id,
                              quantity: item.quantity,
                            })
                          }
                          className="flex items-center gap-1 text-sm text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right: Order Summary */}
        <aside className="bg-white border border-gray-100 rounded-xl p-5 sticky top-6 flex flex-col gap-5">
          <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

          {/* Price Rows */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">
                Subtotal ({selectedItem.length} items)
              </span>
              <span className="text-gray-800">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Estimated Shipping</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Tax (8%)</span>
              <span className="text-gray-800">Rs. {tax.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-gray-900">Total</span>
            <span className="text-xl font-semibold text-gray-900">
              Rs. {grandTotal.toLocaleString()}
            </span>
          </div>

          {/* Promo Code */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Promo Code</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="flex-1 h-10 border border-gray-200 rounded-lg px-3 text-sm bg-gray-50 outline-none focus:border-green-400 focus:bg-white transition-colors"
              />
              <button className="h-10 px-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors">
                Apply
              </button>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            disabled={selectedItem.length === 0}
            onClick={() => navigate('/checkout?type="cart"')}
            className={`w-full h-12 rounded-xl text-sm font-medium transition-all ${
              selectedItem.length > 0
                ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {selectedItem.length > 0
              ? `Proceed to Checkout (${selectedItem.length})`
              : "Select items to checkout"}
          </button>

          {/* Trust Badges */}
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
            {[
              {
                icon: <ShieldCheck className="w-4 h-4 text-green-600" />,
                title: "Secure Checkout",
                sub: "PCI-DSS compliant payments",
              },
              {
                icon: <RotateCcw className="w-4 h-4 text-green-600" />,
                title: "Free Returns",
                sub: "30-day effortless returns policy",
              },
              {
                icon: <Truck className="w-4 h-4 text-green-600" />,
                title: "Fast Shipping",
                sub: "Delivery within 2–3 business days",
              },
            ].map((t) => (
              <div key={t.title} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  {t.icon}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-800">{t.title}</p>
                  <p className="text-xs text-gray-400">{t.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
