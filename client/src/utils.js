import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * 
 * @param {*} price 
 * @param {*} discount 
 * @returns discounted Price
 */
export function discount(price, discount) {
  return Math.floor(price - price * (discount / 100));
}
