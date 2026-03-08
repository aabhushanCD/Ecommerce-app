import React from "react";
import { useParams } from "react-router-dom";
import { useProductDetails } from "../../product.hook";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useProductDetails(id);

  console.log(data);
  return (
    <div className="h-screen">
      <div className="w-full flex items-center h-10 p-2">
        <div>Home / Mon / Tops / post long steve Swerater</div>
      </div>

      <div className=" p-6 flex justify-center  gap-10 flex-1">
        <div className=" ">
          <div className="min-w-120 min-h-100 bg-accent-hover mb-4"></div>
          <div className="flex gap-2 justify-center">
            <div className="w-20 h-20  bg-accent-hover"></div>
            <div className="w-20 h-20  bg-accent-hover"></div>
            <div className="w-20 h-20  bg-accent-hover"></div>
            <div className="w-20 h-20  bg-accent-hover"></div>
          </div>
        </div>
        <div className="w-[40%] flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-semibold pb-4">
              Peanuts Long Sleeve Sweatshirt
            </h1>
            <p className="text-gray-600 pb-4">
              A baseball-themed collection, a favorite of teh Pearusl friends.
            </p>
            <p className="text-gray-500 pb-4">
              This collection features Snoopy and his friends enjouing baseball
              in a vintage peanuts comic look. We feature famoue
            </p>
            <p className="text-gray-500 pb-4">
              <span className="font-bold text-black">5k+ </span>
              <span>Sold </span>
              <span>. </span>
              <span></span>
              <span className="font-bold text-black">4.9 </span>
              <span></span>
            </p>
            <div className="flex items-center gap-10">
              <span className="text-4xl font-bold">$122,00 </span>{" "}
              <span className="text-red-800 line-through ">$150,000</span>
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
            <div>
              <h2 className="text-md font-semibold">Size: Small</h2>
              <div className="flex gap-1">
                <div className="w-7 h-7 bg-amber-200"></div>
                <div className="w-7 h-7 bg-amber-200"></div>
                <div className="w-7 h-7 bg-amber-200"></div>
                <div className="w-7 h-7 bg-amber-200"></div>
                <div className="w-7 h-7 bg-amber-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
