import { useCartStore } from "@/features/cart/cart.store";
import { useProductDetails } from "@/features/product/product.hook";
import { discount } from "@/utils/utils";
import { useSearchParams } from "react-router-dom";
import { buyNow, placedOrder } from "../checkout.service";

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

  /* ---------------- PRICE CALCULATION ---------------- */
  const subtotal = items.reduce((acc, item) => {
    const finalPrice = discount(item.price, item.discount || 0);
    return acc + finalPrice * item.quantity;
  }, 0);

  const shipping = subtotal > 2000 ? 0 : 100;
  const total = subtotal + shipping;

  const structuredData = {
    items,
    subtotal,
    shipping,
    total,
  };
  /* ---------------- PLACE ORDER ---------------- */
  const handlePlacedOrder = async (data) => {
    try {
      if (!items.length) throw new Error("No items to order");

      const orderItems = items.map((item) => item.productId);

      const payload = {
        selectItems: orderItems,
        paymentMethod: data.paymentMethod,
        addressId: data.selectedAddress,
      };

      if (type === "buyNow") {
        return await buyNow(payload);
      }

      return await placedOrder(payload);
    } catch (error) {
      console.error("Order placement failed:", error);
      throw error;
    }
  };
  return { structuredData, handlePlacedOrder };
};
