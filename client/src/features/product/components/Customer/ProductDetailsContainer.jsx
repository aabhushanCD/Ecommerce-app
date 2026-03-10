import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductDetails } from "../../product.hook";

import { HiOutlineChatAlt2 } from "react-icons/hi";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import ProductDetailsHead from "./ProductDetailsHead";

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

const ProductDetails = () => {
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
        <ProductDetailsHead />

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
              <div className="max-w-2xl">
                <h2 className="text-lg font-bold text-gray-800 mb-3">
                  Product Details
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {product?.description ?? "No description available."}
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { label: "Material", value: "100% Cotton" },
                    { label: "Fit", value: "Regular Fit" },
                    { label: "Care", value: "Machine Wash" },
                    { label: "Origin", value: "Made in Nepal" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-gray-700 mt-0.5">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Reviews" && (
              <div className="max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Customer Reviews
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Showing{" "}
                      <span className="font-semibold text-gray-700">5</span> of{" "}
                      <span className="font-semibold text-gray-700">225</span>{" "}
                      reviews
                    </p>
                  </div>
                  <button className="border border-gray-200 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Latest ▾
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {SAMPLE_REVIEWS.map((review) => (
                    <div
                      key={review.id}
                      className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center shrink-0">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800 text-sm">
                              {review.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <StarRating rating={review.rating} />
                              <span className="text-xs text-gray-400">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                          {review.comment}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-indigo-600 transition-colors font-medium">
                            Reply
                          </button>
                          <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-600 transition-colors font-medium">
                            <FaThumbsUp className="text-xs" /> Helpful
                          </button>
                          <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium">
                            <FaThumbsDown className="text-xs" /> Not Helpful
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-6 w-full border-2 border-dashed border-gray-200 rounded-xl py-3 text-sm text-gray-400 font-medium hover:border-indigo-300 hover:text-indigo-500 transition-colors">
                  Load more reviews
                </button>
              </div>
            )}

            {activeTab === "Discussion" && (
              <div className="max-w-2xl text-center py-12 text-gray-400">
                <HiOutlineChatAlt2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-semibold text-gray-500">
                  No discussions yet
                </p>
                <p className="text-sm mt-1">
                  Be the first to start a conversation about this product.
                </p>
                <button className="mt-4 bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors">
                  Start Discussion
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="max-w-2xl border h-10"></div>
      </div>
    </div>
  );
};

export default ProductDetails;
