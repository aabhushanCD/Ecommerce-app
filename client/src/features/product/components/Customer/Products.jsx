import React from "react";
import ProductCart from "./ProductCard";
import { useProducts } from "../../product.hook";
import { Navigate, useNavigate } from "react-router-dom";

const Products = () => {
  const { data, isLoading, error } = useProducts();
  const navigate = useNavigate();
  if (isLoading) {
    return <div className="flex justify-center align-center">... Loading</div>;
  }
  if (error) {
    return <div className="flex justify-center align-center">{error}</div>;
  }
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold ">Product</h1>

      <div
        id="product"
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-fr  mt-4  "
      >
        {data?.data?.products?.map((item) => (
          <div key={item._id} onClick={() => navigate(`/product/${item._id}`)}>
            <ProductCart item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
