import StarRating from "@/components/StarRating";
import React from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const ProductReviews = ({ SAMPLE_REVIEWS }) => {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Customer Reviews</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Showing <span className="font-semibold text-gray-700">5</span> of{" "}
            <span className="font-semibold text-gray-700">225</span> reviews
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
                    <span className="text-xs text-gray-400">{review.date}</span>
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
  );
};

export default ProductReviews;
