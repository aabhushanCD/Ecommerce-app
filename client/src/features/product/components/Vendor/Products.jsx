import { Trash2, Edit, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useDeleteProduct, useGetAllMyProducts } from "../../product.hook";
import { discount } from "@/utils/utils";

const SellerMyProducts = () => {
  const { data, isLoading, error } = useGetAllMyProducts();
  const deleteProduct = useDeleteProduct();

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
    <div className="flex w-6xl">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200 self-start ">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Category
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Price
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Stock
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Availability
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.data?.products.map((product) => {
            const discountedPrice = discount(product.price, product.discount);

            return (
              <tr key={product._id}>
                <td className="px-4 py-2 text-sm font-medium">
                  {product.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {product.category?.name || "-"}
                </td>
                <td className="px-4 py-2 text-sm">
                  ₹{discountedPrice}{" "}
                  {product.discount > 0 && (
                    <span className="line-through text-gray-400 ml-1">
                      ₹{product.price}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-sm">{product.stock}</td>
                <td className="px-4 py-2">
                  <Badge
                    variant={product.isAvailable ? "success" : "destructive"}
                  >
                    {product.isAvailable ? "Available" : "Out"}
                  </Badge>
                </td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Edit size={16} />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="gap-1"
                    disabled={deleteProduct.isLoading}
                    onClick={() => deleteProduct.mutate(product._id)}
                  >
                    <Trash2 size={16} />
                    {deleteProduct.isLoading ? "Deleting..." : "Delete"}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SellerMyProducts;
