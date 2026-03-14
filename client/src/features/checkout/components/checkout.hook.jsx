import { useCartStore } from "@/features/cart/cart.store";
import { useProductDetails } from "@/features/product/product.hook";
import { discount } from "@/utils/utils";
import { useSearchParams } from "react-router-dom";

export const useCheckout = () => {
  const [search] = useSearchParams();

  const productId = search.get("productId");
  const quantity = search.get("quantity");
  const type = search.get("type");

  const { data } = useProductDetails(productId);
  const { selectedItem } = useCartStore();

  let items = [];

  if (type === "buyNow" && data?.data?.product) {
    const product = data.data.product;

    items = [
      {
        productId: product._id,
        name: product.name,
        image: product.image,
        color: product.color,
        quantity: Number(quantity),
        price: product.price,
        discount: product.discount,
      },
    ];
  } else {
    items = selectedItem.map((item) => ({
      productId: item.item._id,
      name: item.item.name,
      image: item.item.image,
      color: item.item.color,
      quantity: item.quantity,
      price: item.item.price,
      discount: item.item.discount,
    }));
  }

  let subtotal = 0;

  items.forEach((item) => {
    const finalPrice = discount(item.price, item.discount || 0);
    subtotal += finalPrice * item.quantity;
  });

  const shipping = 100;
  const total = subtotal + shipping;

  const structuredData = {
    items,
    subtotal,
    shipping,
    total,
  };
  const handlePlacedOrder = async () => {
    
  };
  return { structuredData, handlePlacedOrder };
};
