import React from "react";
import ProductCart from "./ProductCart";
import { useProducts } from "../../product.hook";

const Products = () => {
  const { data, isLoading, error } = useProducts();

  if (isLoading) {
    return <div className="flex justify-center align-center">... Loading</div>;
  }
  if (error) {
    return <div className="flex justify-center align-center">{error}</div>;
  }
  return (
    <section
      id="product"
      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-fr justify-center p-6"
    >
      <h1>Product</h1>
      {data?.data?.products?.map((item) => (
        <ProductCart item={item} />
      ))}
    </section>
  );
};

export default Products;
