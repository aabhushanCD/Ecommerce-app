import React from "react";
import { useParams } from "react-router-dom";
import { useProductDetails } from "../../product.hook";
import { discount } from "@/utils";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useProductDetails(id);

  console.log(data);
  const product = data?.data?.product;
  const fixed = discount(product.price, product.discount);
  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">Something went wrong</div>
    );
  }
  return (
    <div className="min-h-screen">
      <div className="w-full flex items-center h-10 p-2">
        <div>Home / Mon / Tops / post long steve Swerater</div>
      </div>

      <div className=" p-6 flex flex-col lg:flex-row justify-center gap-10">
        <div className=" ">
          <div className="min-w-100 min-h-100 bg-accent-hover mb-4"></div>
          <div className="flex gap-2 justify-center">
            <div className="w-20 h-20  bg-accent-hover"></div>
            <div className="w-20 h-20  bg-accent-hover"></div>
            <div className="w-20 h-20  bg-accent-hover"></div>
            <div className="w-20 h-20  bg-accent-hover"></div>
          </div>
        </div>
        <div className="w-full lg:w-[40%] flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-semibold pb-4">{product.name}</h1>
            <p className="text-gray-600 pb-4">
              A baseball-themed collection, a favorite of teh Pearusl friends.
            </p>
            <p className="text-gray-500 pb-4">{product.description}</p>
            <p className="text-gray-500 pb-4">
              <span className="font-bold text-black">5k+ </span>
              <span>Sold </span>
              <span>. </span>
              <span></span>
              <span className="font-bold text-black">4.9 </span>
              <span></span>
            </p>
            <div className="flex items-center gap-10">
              <span className="text-4xl font-bold">
                {"Rs. "}
                {fixed}
              </span>
              <span className="text-red-800 line-through ">
                {" "}
                {"Rs."}
                {product.price}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="text-md font-semibold ">Color: 53 Green</h2>
              <div className="flex gap-1">
                <div className="w-7 h-7 bg-amber-200"></div>
                <div className="w-7 h-7 bg-amber-200"></div>
                <div className="w-7 h-7 bg-amber-200"></div>
              </div>
            </div>
            <div className="pb-8">
              <h2 className="text-md font-semibold">Size: Small</h2>
              <div className="flex gap-1">
                <div className="w-7 h-7 bg-amber-200"></div>
                <div className="w-7 h-7 bg-amber-200"></div>
                <div className="w-7 h-7 bg-amber-200"></div>
                <div className="w-7 h-7 bg-amber-200"></div>
                <div className="w-7 h-7 bg-amber-200"></div>
              </div>
            </div>
            <button className="bg-primary rounded-md text-white hover:bg-primary-hover w-full h-10 p-2 text-center">
              + Add to Cart
            </button>
            <button className="bg-primary rounded-md text-white hover:bg-primary-hover w-full h-10 p-2 text-center">
              Buy this Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
