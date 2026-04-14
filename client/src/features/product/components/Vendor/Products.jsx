import { Trash2, Edit, Package, DollarSign, Eye, ShoppingBag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useDeleteProduct, useGetAllMyProducts } from "../../product.hook";
import { discount } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import StatCard from "@/pages/Seller/components/StatCard";

const SellerMyProducts = () => {
  const { data, isLoading, error } = useGetAllMyProducts();
  const deleteProduct = useDeleteProduct();
  const navigate = useNavigate();

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      deleteProduct.mutate(productId, {
        onSuccess: () => toast.success("Product deleted successfully"),
        onError: () => toast.error("Failed to delete product"),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load products
      </div>
    );
  }

  if (data?.data.products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <Package size={48} className="mb-4 opacity-40" />
        <p className="text-lg font-medium">No products added yet</p>
        <p className="text-sm">Start adding products to see them here</p>
      </div>
    );
  }

  return (
    <div className="w-full px-2 md:px-4">
      <header className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-2xl font-bold">My Products</h2>
        <Button onClick={() => navigate("/seller/product/add")}>
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 ">
      <StatCard
          title="Total Products"
          value={data?.data?.products.length}
          change=""
          icon={<Package />}
          linear="from-blue-500 to-blue-600"
        />
      <StatCard
          title="Total Sales"
          value={data?.data?.products.reduce((acc, product) => acc + product.price, 0)}
          change=""
          icon={<DollarSign />}
          linear="from-green-500 to-green-600"
        />
      <StatCard
          title="Total Views"
          value={data?.data?.products.reduce((acc, product) => acc + product.views, 0)}
          change=""
          icon={<Eye />}
          linear="from-yellow-500 to-yellow-600"
        />
      <StatCard
          title="Total Orders"
          value={data?.data?.products.length}
          change=""
          icon={<ShoppingBag />}
          linear="from-green-500 to-green-600"
        />
        </div>
      {/* 📱 MOBILE VIEW (Cards) */}
      <div className="grid gap-4 md:hidden">
        {data?.data?.products.map((product) => {
          const discountedPrice = discount(product.price, product.discount);

          return (
            <div
              key={product._id}
              className="border rounded-xl p-4 shadow-sm bg-white space-y-2"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-sm">
                  {product.name.length > 25
                    ? product.name.slice(0, 25) + "..."
                    : product.name}
                </h3>
                <Badge
                  variant={product.isAvailable ? "success" : "destructive"}
                >
                  {product.isAvailable ? "Available" : "Out"}
                </Badge>
              </div>

              <p className="text-xs text-gray-500">
                {product.category?.name || "No category"}
              </p>

              <div className="text-sm">
                ₹{discountedPrice}
                {product.discount > 0 && (
                  <span className="line-through text-gray-400 ml-2 text-xs">
                    ₹{product.price}
                  </span>
                )}
              </div>

              <p className="text-xs">Stock: {product.stock}</p>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    navigate(`/seller/product/edit/${product._id}`)
                  }
                >
                  <Edit size={14} />
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  disabled={deleteProduct.isPending || deleteProduct.isLoading}
                  onClick={() => handleDelete(product._id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 💻 TABLET + DESKTOP VIEW */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border rounded-xl overflow-hidden shadow-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data?.data?.products.map((product) => {
              const discountedPrice = discount(product.price, product.discount);

              return (
                <tr key={product._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm font-medium max-w-[180px] truncate">
                    {product.name}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-500">
                    {product.category?.name || "-"}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    ₹{discountedPrice}
                    {product.discount > 0 && (
                      <span className="line-through text-gray-400 ml-2 text-xs">
                        ₹{product.price}
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-sm">{product.stock}</td>

                  <td className="px-4 py-3">
                    <Badge
                      variant={product.isAvailable ? "success" : "destructive"}
                    >
                      {product.isAvailable ? "Available" : "Out"}
                    </Badge>
                  </td>

                  <td className="px-4 py-3 flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigate(`/seller/product/edit/${product._id}`)
                      }
                    >
                      <Edit size={16} />
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={deleteProduct.isPending || deleteProduct.isLoading}
                      onClick={() => handleDelete(product._id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerMyProducts;
