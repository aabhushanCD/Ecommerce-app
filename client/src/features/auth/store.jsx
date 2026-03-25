/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

import { toast } from "sonner";

import { authMe, Login, logout, signup } from "./auth.service";
// axios.defaults.withCredentials = true;
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  // Fetch logged-in user
  const me = async () => {
    setLoading(true);
    try {
      const res = await authMe();
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
      const res = await Login(data);
      setCurrentUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return false;
    }
  };

  // Signup
  const Signup = async (data) => {
    try {
      const res = await signup(data);
      toast.success(res.data?.message || "Account created successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return false;
    }
  };

  const logOut = async () => {
    try {
      const res = await logout();
      if (res.status === 200) {
        setCurrentUser(null);
        localStorage.removeItem("user");
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, Signup, me, isLoading, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
