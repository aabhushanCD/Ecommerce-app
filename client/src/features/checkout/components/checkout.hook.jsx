import { useCartStore } from "@/features/cart/cart.store";
import { useProductDetails } from "@/features/product/product.hook";
import { discount } from "@/utils/utils";
import { useSearchParams } from "react-router-dom";
import { buyNow, placedOrder } from "../checkout.service";
import { useCallback, useState } from "react";
import { normalizeError } from "@/utils/normalizeError";

export const useCheckout = () => {
  const [search] = useSearchParams();
  const productId = search.get("productId");
  const quantity = search.get("quantity");
  const type = search.get("type");

  const { data } = useProductDetails(productId);
  const { selectedItem } = useCartStore();

  const [orderState, setOrderState] = useState({
    status: "idle",
    orderId: null,
    error: null,
  });
  let items = [];

  if (type === "buyNow" && data?.data?.product) {
    const product = data.data.product;

    items = [
      {
        productId: product._id,
        name: product.name,
        image: product.imageUrls,
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
      image: item.item.imageUrls,
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

  /* ---------------- PLACE ORDER ---------------- */
  const handlePlacedOrder = useCallback(
    async (data) => {
      try {
        if (!items.length) {
          setOrderState({
            status: "error",
            orderId: null,
            error: "Cart is empty",
          });
          return;
        }

        const payload = {
          selectItems: items.map((i) => i.productId),
          paymentMethod: data.paymentMethod,
          addressId: data.selectedAddress,
        };

        const res =
          type === "buyNow"
            ? await buyNow(payload)
            : await placedOrder(payload);
        setOrderState({
          status: "success",
          orderId: res?.data?.orderId ?? null,
          error: null,
        });

        return res;
      } catch (err) {
        const { message } = normalizeError(err);
        setOrderState({ status: "error", orderId: null, error: message });
      }
    },
    [items, type],
  );
  const resetOrder = useCallback(() => {
    setOrderState({ status: "idle", orderId: null, error: null });
  }, []);

  return {
    structuredData: { items, subtotal, shipping, total },
    orderState, // { status, orderId, error }
    handlePlacedOrder,
    resetOrder,
  };
};
