import { ServerApi } from "@/constant";

export const BASE_URL = ServerApi;

export const AUTH_URL = {
  login: "/auth/login",
  // Signup: "/auth/signup",
  me: "/auth/me",
  logout: "/auth/logout",
};
