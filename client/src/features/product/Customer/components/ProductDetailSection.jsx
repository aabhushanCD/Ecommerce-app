import React from "react";

const ProductDetailSection = ({ product }) => {
  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-bold text-gray-800 mb-3">Product Details</h2>
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
  );
};

export default ProductDetailSection;
