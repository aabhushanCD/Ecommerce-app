import React from "react";

import ProductCart from "./productCart";
import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/services/axiosInstance";

const fetchProduct = async ({ flash = false, page = 1, limit = 10 }) => {
  const res = await axiosInstance.get(`/product/view`, {
    params: {
      flash,
      page,
      limit,
    },
    withCredentials: true,
  });

  return res.data.products;
};
const SuggestedProduct = () => {
  const discountedPrice = (price, discount) =>
    Math.floor(price - price * (discount / 100));

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["suggested-products"],
    queryFn: () => fetchProduct({ limit: 10, sort: "popular" }),
  });

  if (isLoading) {
    return <p className="p-4 text-gray-500">Loading suggestions...</p>;
  }

  if (isError) {
    return <p className="p-4 text-red-500">Failed to load products</p>;
  }

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
