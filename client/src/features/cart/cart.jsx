import React, { useEffect, useState } from "react";
import { useCartStore } from "./cart.store";
import { discount } from "@/utils/utils";
import { BsFillTagFill } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
const Cart = () => {
  const { cartItems, removeItem, viewCart, loading } = useCartStore();
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    viewCart();
  }, [viewCart]);

  const handleChoose = (data) => {
    setSelectedItems((prev) => {
      const exists = prev.find((item) => item.item === data.item);
      if (exists) {
        return prev.filter((item) => item.item !== data.item);
      }
      return [...prev, data];
    });
  };
  console.log(selectedItems);
  return (
    <main className="flex  min-h-screen">
      <section className="border-t pt-14 w-4xl border rounded-2xl mt-10 p-8">
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
                  <span className=" text-xl sm:text-2xl  ">
                    {item.item.name}
                  </span>

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

                <input
                  type="checkbox"
                  checked={selectedItems.some((i) => i.item._id === item.item._id)}
                  onChange={() => handleChoose(item)}
                  name="selectItem"
                  id=""
                />
              </div>
              <button
                onClick={() =>
                  removeItem({
                    productId: item.item._id,
                    quantity: item.quantity,
                  })
                }
                className=" rounded full  text-red-500 cursor-pointer "
              >
                <TiDeleteOutline className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10  w-110 p-4 m-auto border flex flex-col justify-center items-center gap-4 ">
        <div className="border-b pb-4">
          <h1 className="text-xl font-semibold pb-4 ">Coupons</h1>
          <div className=" flex items-center p-2   gap-4 justify-between  w-100 h-10 border rounded-lg ">
            <span className="flex gap-1 items-center ">
              <BsFillTagFill />
              <span className="font-medium">Coupons</span>
            </span>
            <input className="w-full outline-0" type="text" />
            <span>X</span>
          </div>
        </div>
        <div className=" ">
          <h1 className="font-medium">Price Details</h1>
          <div className="w-100 h-50 pb-2">
            <h2 className="pb-2">{"1 "}Items</h2>
            <p className="flex justify-between items-center pb-2">
              <span>{"1 x product name"}</span> <span>{"Rs. Price"}</span>
            </p>
            <p className="flex justify-between items-center pb-2">
              <span>{"Coupon discount"}</span> <span>{" - Rs. Price"}</span>
            </p>
            <p className="flex justify-between items-center pb-2 border-b-2">
              <span>{"Delivery Charge"}</span> <span>{"Free Delivery"}</span>
            </p>
            <p className="flex justify-between items-center pb-2 pt-2">
              <span>{"Total"}</span> <span>{"Rs. 324234"}</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
