import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductDetails } from "../../product.hook";

import { HiOutlineChatAlt2 } from "react-icons/hi";

import { ChevronRight } from "lucide-react";
import ProductDetailsHead from "./ProductDetailsHead";

import ProductReviews from "./ProductReviews";
import ProductDetailSection from "./ProductDetailSection";
import ProductDiscussion from "./ProductDiscussion";

const SAMPLE_REVIEWS = [
  {
    id: 1,
    name: "Aabhushan Dhakal",
    rating: 5,
    date: "Feb 12, 2025",
    comment:
      "Absolutely love this sweater! The fabric is soft and the fit is perfect. Highly recommend.",
    avatar: "AD",
  },
  {
    id: 2,
    name: "Sita Rai",
    rating: 4,
    date: "Jan 28, 2025",
    comment:
      "Great quality for the price. Color is exactly as shown. Shipping was fast too!",
    avatar: "SR",
  },
  {
    id: 3,
    name: "Bikram Thapa",
    rating: 5,
    date: "Jan 15, 2025",
    comment: "Best purchase I've made this season. Super warm and stylish.",
    avatar: "BT",
  },
];

const ProductDetailsContainer = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useProductDetails(id);

  const [activeTab, setActiveTab] = useState("Details");

  const product = data?.data?.product;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <p className="text-red-500 font-semibold text-lg">
            Something went wrong
          </p>
          <p className="text-red-400 text-sm mt-1">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 h-11 text-sm text-gray-500">
            {["Home", "Men", "Tops", product?.name ?? "Product"].map(
              (crumb, i, arr) => (
                <React.Fragment key={crumb}>
                  <span
                    className={
                      i === arr.length - 1
                        ? "text-gray-800 font-medium truncate max-w-xs"
                        : "hover:text-indigo-600 cursor-pointer"
                    }
                  >
                    {crumb}
                  </span>
                  {i < arr.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  )}
                </React.Fragment>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetailsHead product={product} />

        {/* Tabs Section */}
        <div className="mt-6 max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tab Bar */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {["Details", "Reviews", "Discussion"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none sm:px-8 py-4 text-sm font-semibold transition-all border-b-2 ${
                  activeTab === tab
                    ? "border-indigo-600 text-indigo-600 bg-white"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab}
                {tab === "Reviews" && (
                  <span className="ml-2 bg-indigo-100 text-indigo-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    225
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 lg:p-8">
            {activeTab === "Details" && (
              <ProductDetailSection product={product} />
            )}

            {activeTab === "Reviews" && (
              <ProductReviews SAMPLE_REVIEWS={SAMPLE_REVIEWS} />
            )}

            {activeTab === "Discussion" && <ProductDiscussion />}
          </div>
        </div>
        <div className="max-w-2xl border h-10"></div>
      </div>
    </div>
  );
};

export default ProductDetailsContainer;
