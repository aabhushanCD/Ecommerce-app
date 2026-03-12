import { useProductDetails } from "@/features/product/product.hook";
import React from "react";
import { useSearchParams } from "react-router-dom";

const CheckoutItems = ({ items }) => {
  const [search] = useSearchParams();

  const type = search.get("type");
  const quantity = search.get("quantity");
  const productId = search.get("productId");

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
    checkoutItems = [];
  }

  return (
    <div className="border-2 p-6 rounded-xl max-w-3xl ml-4 mt-10">
      <h1 className="text-2xl font-semibold pb-8">Review Item And Shipping</h1>

      {checkoutItems?.map((item) => (
        <div
          key={item._id}
          className="flex gap-6 items-center border-b pb-6 mb-6"
        >
          <img
            src={item?.image}
            alt={item?.name}
            className="w-28 h-28 object-cover rounded-xl border"
          />

          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <span className="font-bold text-lg">{item?.name}</span>
              <span className="text-gray-500">Color: {item?.color}</span>
            </div>

            <div className="flex flex-col text-right">
              <span className="font-semibold text-lg">Rs. {item?.price}</span>
              <span className="font-medium">Quantity: {item.quantity}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutItems;
