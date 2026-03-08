import React from "react";
import ProductCart from "./ProductCard";
import { useProducts } from "../../product.hook";
import { discount } from "@/utils";

const SuggestedProduct = () => {
  const { data, isLoading, error } = useProducts();

  if (isLoading) {
    return <p className="p-4 text-gray-500">Loading suggestions...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">Failed to load products</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4">Suggestions</h2>
      <div className="flex gap-6 flex-1 overflow-auto scroll-m-10 pb-4 scrollbar-thin">
        {data?.data?.products?.map((item) => (
          <div className="min-w-max ">
            <ProductCart
              key={item._id}
              item={item}
              discountedPrice={() => discount(item.price, item.discount)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedProduct;
