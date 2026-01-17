import { useRef } from "react";
import { Upload } from "lucide-react";

import axios from "axios";
import { ServerApi } from "@/constant";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ProductAdd({ showAddProduct, setShowAddProduct }) {
  // const [productDetails, setProductDetails] = useState({
  //   title: "",
  //   price: "",
  //   discount: "",
  //   stock: "",
  //   description: "",
  //   categories: "",
  // });

  const titleRef = useRef();
  const priceRef = useRef();
  const skuRef = useRef();
  const discountRef = useRef();
  const stockRef = useRef();
  const descriptionRef = useRef();
  const categoriesRef = useRef();

  const handleSubmit = async () => {
    const title = titleRef.current.value;
    const price = priceRef.current.value;
    const sku = skuRef.current.value;
    const discount = discountRef.current.value;
    const description = descriptionRef.current.value;
    const categories = categoriesRef.current.value;
    const stock = stockRef.current.value;

    try {
      console.log(title, price, sku, discount, description, categories, stock);
      const res = await axios.post(
        `${ServerApi}/product/add-product`,
        {
          name: title,
          category: categories,
          description: description,
          price: price,
          discount: discount,
          stock: stock,
          // sku,
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
    <>
      {showAddProduct && (
        <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-6 text-gray-800">
            Add New Product
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                ref={titleRef}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                ref={categoriesRef}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              >
                <option>Select category</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Garden</option>
                <option>Sports</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                ref={priceRef}
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount
              </label>
              <input
                ref={discountRef}
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                ref={stockRef}
                type="number"
                placeholder="0"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU
              </label>
              <input
                ref={skuRef}
                type="text"
                placeholder="Product SKU"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                ref={descriptionRef}
                rows="4"
                placeholder="Describe your product..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-violet-500 transition-colors cursor-pointer bg-gray-50/50">
                <Upload className="mx-auto mb-3 text-gray-400" size={40} />
                <p className="text-gray-600 mb-1">
                  <span className="text-violet-600 font-medium">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              className="flex-1 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-md hover:shadow-lg transition-all"
              onClick={handleSubmit}
            >
              Publish Product
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowAddProduct(false)}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}

export default ProductAdd;
