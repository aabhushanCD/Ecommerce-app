import React from "react";
import product1 from "/images/cosmetic.jpg";
import photo3 from "/images/photo3.jpg";
import messi from "/images/cosmetic.jpg";
import photo2 from "/images/cream.webp";
const product = [
  {
    name: "Toy",
    image: photo3,
    price: "1000",
    discount: 10,
  },
  {
    name: "Toy",
    image: messi,
    price: "10000",
    discount: 10,
  },
  {
    name: "Toy",
    image: photo2,
    price: "1000",
    discount: 10,
  },
];
const SuggestedProduct = () => {
  const handleDiscount = (price, discount) => {
    return price * (discount / 100);
  };
  return (
    <div className="p-1">
      <div className="text-2xl font-semibold p-1">Suggestions</div>
      <div className="flex gap-5 flex-wrap ">
        {product &&
          product.map((item, index) => (
            <div
              key={index}
              className="border transform transition-transform hover:scale-102 duration-200"
            >
              <div className="w-70 ">
                <img
                  src={item.image}
                  className="object-cover w-full h-full"
                  alt="Product Image"
                />
              </div>
              <div className="p-2">
                <p> {item.name}</p>
                <p className="text-red-500">Rs.{item.price}</p>
                <div className="flex gap-2 text-[14px]">
                  <p className="line-through text-gray-400">
                    Rs.{handleDiscount(item.price, item.discount)}
                  </p>
                  <p>{"-10%"}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SuggestedProduct;
