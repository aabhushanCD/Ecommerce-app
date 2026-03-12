import React, { useEffect } from "react";
import { useCartStore } from "./cart.store";
import { discount } from "@/utils/utils";
import { TiDeleteOutline } from "react-icons/ti";
const Cart = () => {
  const { cartItems, removeItem, viewCart, loading } = useCartStore();

  useEffect(() => {
    viewCart();
  }, [viewCart]);

  return (
    <div className="border-t pt-14 w-4xl border rounded-2xl mt-10 p-8">
      <div className="text-2xl mb-3">
        <h1>
          YOUR <span className="text-green-800">CART</span>
        </h1>
      </div>
      {loading && <p>Loading cart...</p>}
      <div>
        {cartItems?.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
          >
            <div className="flex justify-start   gap-6 items-center">
              <img
                src={item.item?.image}
                className="w-16 border h-16 sm:w-20"
                alt=""
              />
              <div className=" flex flex-col w-full">
                <span className=" text-xl sm:text-2xl  ">{item.item.name}</span>

                <span className="font-medium text-green-400">
                  <span className="text-lg">Rs. </span>
                  {discount(item?.item?.price, item.item.discount) *
                    item?.quantity || NaN}
                </span>
                <span>{`Total Discount: ${item.item.discount}%`}</span>
              </div>
            </div>

            <div className=" flex gap-4 items-center justify-center">
              <span className="font-medium text-blue-600">
                Quantity: <span className="text-xl">{item.quantity}</span>
              </span>

              <input type="checkbox" name="" id="" />
            </div>
            <button
              onClick={() =>
                removeItem({
                  productId: item.item._id,
                  quantity: item.item.quantity,
                })
              }
              className=" rounded full  text-red-500 cursor-pointer "
            >
              <TiDeleteOutline className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
