import React from "react";
import product1 from "/images/cosmetic.jpg";
import photo3 from "/images/photo3.jpg";
import photo2 from "/images/cream.webp";
import ProductCart from "./productCart";

const products = [
  {
    name: "Toy",
    image: photo3,
    price: 1000,
    discount: 10,
  },
  {
    name: "Toy",
    image: product1,
    price: 10000,
    discount: 10,
  },
  {
    name: "Toy",
    image: photo2,
    price: 1000,
    discount: 10,
  },
  {
    name: "Toy",
    image: photo2,
    price: 1000,
    discount: 10,
  },
  {
    name: "Toy",
    image: photo2,
    price: 1000,
    discount: 10,
  },
  {
    name: "Toy",
    image: photo2,
    price: 1000,
    discount: 10,
  },
  {
    name: "Toy",
    image: photo2,
    price: 1000,
    discount: 10,
  },
  {
    name: "Toy",
    image: photo2,
    price: 1000,
    discount: 10,
  },
  {
    name: "Toy",
    image: photo2,
    price: 1000,
    discount: 10,
  },
];

const SuggestedProduct = () => {
  const discountedPrice = (price, discount) => price - price * (discount / 100);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Suggestions</h2>

      <div className="flex gap-6 flex-1 overflow-auto scroll-m-10 pb-4 scrollbar-thin">
        {products.map((item) => (
          <div className="min-w-max ">
            <ProductCart item={item} discountedPrice={discountedPrice} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedProduct;
