import { create } from "zustand";
import { addCart, deleteCartProduct, viewCartProduct } from "./cart.service";

export const useCartStore = create((set) => ({
  cartItem: [],
  addItem: async (data) => {
    const res = await addCart(data);
    set({
      cartItem: res.data.cartItems,
    });
  },

  removeItem: async (productId) => {
    await deleteCartProduct(productId);

    set((state) => ({
      cartItem: state.cartItem.filter((item) => item.productId !== productId),
    }));
  },

  viewCart: async () => {
    const res = await viewCartProduct();

    set({
      cartItem: res.data.cartItems,
    });
  },
}));
