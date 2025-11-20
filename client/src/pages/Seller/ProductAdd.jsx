import { useState } from "react";
import { Heart, Share2, Star } from "lucide-react";
import messi from "/images/cosmetic.jpg";
import axios from "axios";
import { ServerApi } from "@/constant";

function ProductAdd() {
  const [productDetails, setProductDetails] = useState({
    title: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    categories: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${ServerApi}/product/add-product`,
        {
          name: productDetails.title,
          category: productDetails.categories,
          description: productDetails.description,
          price: productDetails.price,
          discount: productDetails.discount,
          stock: productDetails.stock,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        console.log("Product added successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
      {/* Form Section */}
      <div className="bg-white p-6 shadow-xl rounded-2xl border">
        <h1 className="text-3xl font-semibold border-b pb-3 mb-6 text-gray-800">
          Add New Product
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Inputs */}
          {[
            ["title", "Title", "text"],
            ["price", "Price", "number"],
            ["discount", "Discount (%)", "number"],
            ["stock", "Stock / Quantity", "number"],
            ["categories", "Categories", "text"],
          ].map(([key, label, type]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                {label}
              </label>

              <input
                type={type}
                name={key}
                value={productDetails[key]}
                onChange={handleChange}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          ))}

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={productDetails.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="border rounded-lg px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition active:scale-95 shadow-lg"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Product Preview Section */}
      <div className="p-4 bg-gray-50 rounded-2xl shadow-lg max-h-screen overflow-auto border">
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>

        <div className="flex gap-6">
          {/* Preview Image */}
          <div className="w-60 h-60 rounded-lg overflow-hidden border shadow">
            <img src={messi} className="w-full h-full object-cover" />
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
              {productDetails.title || "Sample Product Name"}
            </h1>

            {/* Rating */}
            <div className="flex items-center mt-3">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} size={16} className="text-yellow-400" />
              ))}
              <Star size={16} className="text-gray-300" />
              <span className="ml-2 text-sm text-blue-700">
                Rating 4.0 | 5 Answered Questions
              </span>
            </div>

            {/* Share + Like */}
            <div className="flex gap-3 mt-4 text-gray-700">
              <Share2 /> <Heart />
            </div>

            <p className="text-sm mt-4 text-gray-600">
              Brand: <span className="text-blue-600">Your Brand</span>
            </p>

            {/* Price Section */}
            <div className="mt-6">
              <div className="text-2xl font-bold text-green-700">
                Rs. {productDetails.price || "0"}
              </div>

              {productDetails.discount && (
                <div className="text-sm text-red-500">
                  -{productDetails.discount}% Discount Applied
                </div>
              )}
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed">
              {productDetails.description ||
                "Your product description will appear here as you type."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAdd;
