import { useState } from "react";
import messi from "/images/cosmetic.jpg";
import photo2 from "/images/cream.webp";
import photo3 from "/images/photo3.jpg";
import { Heart, Share2, Star } from "lucide-react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Details:", productDetails);
    // Here you can send productDetails to backend
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      {/* Form */}
      <div className="max-w-xl w-full mx-auto md:mx-0 mt-10 p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-semibold border-b pb-3 mb-6 text-gray-800">
          Add New Product
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={productDetails.title}
              placeholder="Enter product title"
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={productDetails.price}
              placeholder="Enter price"
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Discount */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              value={productDetails.discount}
              placeholder="Enter discount %"
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Stock / Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={productDetails.stock}
              placeholder="Enter available stock"
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={productDetails.description}
              placeholder="Enter product description"
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none h-24"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Categories
            </label>
            <input
              type="text"
              name="categories"
              value={productDetails.categories}
              placeholder="Enter categories (comma separated)"
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all active:scale-95 shadow-md"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Live Preview */}
      <div>
        <div className="flex gap-5">
          <div className="w-90 h-50 ">
            <img src={messi} className="" alt="" />
          </div>
          <div className="w-100 text-2xl">
            <p >SKYWORTH 32 Inch Google Android 11 HD Smart TV 32STD2000</p>
            <div className=" mt-7  flex items-center justify-between">
              <div className="flex items-center">
                <Star size={12} />
                <Star size={12} />
                <Star size={12} />
                <Star size={12} />
                <span className="ml-2 text-[15px] text-blue-700">
                  Rating {40} | {5} Answered Questions
                </span>
              </div>
              <span className="flex gap-2">
                <Share2 /> <Heart />
              </span>
            </div>
            <div className="flex text-[12px] mt-5">
              <span className="mr-2">Brand: awai</span> |{" "}
              <span className="ml-2 text-blue-600">
                More Television From awai
              </span>
            </div>
          </div>
        </div>

        <div>sdfsd</div>
      </div>
    </div>
  );
}

export default ProductAdd;
