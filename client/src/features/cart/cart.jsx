import React from "react";
import { useCartStore } from "./cart.store";

const Cart = () => {
  const { cartItems } = useCartStore();
  console.log(cartItems);
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <h1>
          YOUR <span>CART</span>
        </h1>
      </div>
      <div>
        {cartItems?.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
          >
            <div className="flex items-start gap-6">
              <img src={item.item?.image} className="w-16 sm:w-20" alt="" />
              <div>
                <p className="text-sm sm:text-lg font-medium">
                  {item.item.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
