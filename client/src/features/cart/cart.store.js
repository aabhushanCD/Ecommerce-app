import { create } from "zustand";
import { addCart, deleteCartProduct, viewCartProduct } from "./cart.service";
import { persist } from "zustand/middleware";
export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      loading: false,
      error: null,

      addItem: async (data) => {
        try {
          set({ loading: true, error: null });

          const res = await addCart(data);

          set({
            cartItems: res.data.cart.cartItems,
          });
        } catch (err) {
          set({
            error: err.message || "Failed to add item",
          });
        } finally {
          set({ loading: false });
        }
      },

      removeItem: async (productId) => {
        try {
          set({ loading: true, error: null });

          await deleteCartProduct(productId);

          set((state) => ({
            cartItems: state.cartItem.filter(
              (item) => item.productId !== productId,
            ),
          }));
        } catch (err) {
          set({
            error: err.message || "Failed to remove item",
          });
        } finally {
          set({ loading: false });
        }
      },

      viewCart: async () => {
        try {
          set({ loading: true, error: null });

          const res = await viewCartProduct();

          set({
            cartItems: res.data.cart.cartItems,
          });
        } catch (err) {
          set({
            error: err.message || "Failed to load cart",
          });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
