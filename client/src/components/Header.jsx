import { useAuth } from "@/Store/store";
import { LogOut, Search, ShoppingCart, Moon, Sun } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

const Header = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { currentUser, logOut } = useAuth();

  const handleLogout = async () => {
    const success = await logOut();
    if (success) navigate("/login");
  };

  return (
    <header className="w-full bg-[#0f172a] dark:bg-black text-white ">
      {/* Top bar */}
      {!currentUser && (
        <div className="hidden md:flex justify-end gap-6 text-xs px-6 py-2 bg-[#020617] text-gray-300 dark:bg-gray-800">
          <button className="hover:text-green-400">SAVE MORE ON APP</button>
          <button className="hover:text-green-400">BECOME A SELLER</button>
          <button className="hover:text-green-400">HELP & SUPPORT</button>
          <button
            onClick={() => navigate("/login")}
            className="hover:text-green-400"
          >
            LOGIN
          </button>
          <button
            onClick={() => navigate("/register")}
            className="hover:text-green-400"
          >
            SIGN UP
          </button>
          <button className="hover:text-green-400">EN</button>
        </div>
      )}

      {/* Main header */}
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold font-mono cursor-pointer"
        >
          Hell<span className="text-emerald-400">'O</span>
        </h1>

        {/* Search */}
        <div className="hidden md:flex items-center w-full max-w-xl bg-white rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 text-black outline-none"
          />
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600">
            <Search className="text-white" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="relative hover:text-yellow-400 transition">
            <ShoppingCart size={28} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 rounded-full">
              2
            </span>
          </button>

          {currentUser && (
            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition"
            >
              <LogOut size={26} />
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-blue-600 dark:bg-gray-700 hover:scale-105 transition"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex items-center bg-white rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 text-black outline-none"
          />
          <button className="bg-blue-500 px-3 py-2">
            <Search className="text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
