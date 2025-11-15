import { createContext, useContext, useState } from "react";
import axios from "axios";
import { ServerApi } from "@/constant";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Fetch logged-in user
  const me = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${ServerApi}/auth/me`, {
        withCredentials: true,
      });

      setCurrentUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      setCurrentUser(null);
      localStorage.removeItem("user");

      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (data) => {
    try {
      const res = await axios.post(`${ServerApi}/auth/login`, data);

      setCurrentUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res?.data?.message || "Logged in successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return false;
    }
  };

  // Signup
  const Signup = async (data) => {
    try {
      const res = await axios.post(`${ServerApi}/auth/register`, data);

      toast.success(res.data?.message || "Account created successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, Signup, me, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
