/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

import { toast } from "sonner";

import { authMe, Login, logout, signup } from "./auth.service";

// axios.defaults.withCredentials = true;
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, serError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch logged-in user
  useEffect(() => {
    const me = async () => {
      setLoading(true);
      try {
        const res = await authMe();
        return setCurrentUser(res.data.user);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    me();
  }, []);

  // Login
  const login = async (data) => {
    try {
      const res = await Login(data);
      setCurrentUser(res.data.user);
      return true;
    } catch (error) {
      serError(error.response?.data?.message || "Login Error!");
      toast.error(error.response?.data?.message || error.message);
      return false;
    }
  };

  // Signup;
  const Signup = async (data) => {
    try {
      const res = await signup(data);
      toast.success(res.data?.message || "Account created successfully");
      return true;
    } catch (error) {
      serError(error.response?.data?.message || "Signup Error!");
      toast.error(error.response?.data?.message || error.message);
      return false;
    }
  };

  const logOut = async () => {
    try {
      const res = await logout();
      if (res.status === 200) {
        setCurrentUser(null);
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, error, login, Signup, isLoading, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
