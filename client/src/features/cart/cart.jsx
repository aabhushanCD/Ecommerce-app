import React, { useEffect } from "react";
import { useCartStore } from "./cart.store";
import { discount } from "@/utils/utils";
import { BsFillTagFill } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItems, removeItem, viewCart, loading } = useCartStore();
  const selectedItem = useCartStore((state) => state.selectedItem);
  const setSelectedItem = useCartStore((state) => state.setSelectedItem);

  const navigate = useNavigate();
  useEffect(() => {
    viewCart();
  }, [viewCart]);

  const handleChoose = (data) => {
    setSelectedItem((prev) => {
      const exists = prev.find((item) => item.item._id === data.item._id);
      if (exists) {
        return prev.filter((item) => item.item._id !== data.item._id);
      }
      return [...prev, data];
    });
  };
  let total = selectedItem.reduce((acc, item) => {
    const price = discount(item.item.price, item.item.discount);
    return acc + price * item.quantity;
  }, 0);

  return (
    <main className="flex ">
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
                  checked={selectedItem.some(
                    (i) => i.item._id === item.item._id,
                  )}
                  onChange={() => handleChoose(item)}
                  name="selectItem"
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
      <section className="mt-10  w-110 p-4 m-auto border rounded-2xl flex flex-col justify-center items-center gap-4 ">
        <div className="border-b pb-4">
          <h1 className="text-xl font-semibold pb-4 ">Coupons</h1>
          <div className=" flex items-center p-2   gap-4 justify-between  w-100 h-10 border rounded-lg ">
            <span className="flex gap-1 items-center ">
              <BsFillTagFill />
              <span className="font-medium">Coupons</span>
            </span>
            <input className="w-full outline-0" type="text" />
            <span className="cursor-pointer">X</span>
          </div>
        </div>
        <div className=" ">
          <h1 className="font-medium">Price Details</h1>
          <div className="w-100  pb-2">
            <h2 className="pb-2">{`${selectedItem.length}`}Items</h2>
            {selectedItem?.map((item) => (
              <div key={item.item._id}>
                <p className="flex justify-between items-center pb-2">
                  <span>
                    {item.quantity} x {item.item.name}
                  </span>
                  <span>Rs. {item.item.price}</span>
                </p>

                <p className="flex justify-between items-center pb-2">
                  <span>{"Discount"}</span>{" "}
                  <span>Rs. {total - item.item.price}</span>
                </p>
              </div>
            ))}
            <p className="flex justify-between items-center pb-2 border-b-2">
              <span>{"Delivery Charge"}</span> <span>{"Free Delivery"}</span>
            </p>
            <p className="flex justify-between items-center pb-2 pt-4 font-bold">
              <span>{"Total"}</span> <span>Rs. {total}</span>
            </p>
          </div>

          {selectedItem.length > 0 && (
            <div
              onClick={() => navigate('/checkout?type="cart"')}
              className={` bg-black flex text-white p-3 rounded-2xl  items-center justify-center`}
            >
              <button>Proced to Checkout</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Cart;
