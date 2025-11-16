import { useAuth } from "@/Store/store";
import { Search, ShoppingCart } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <div className=" flex flex-col w-full h-30 justify-center   items-center gap-4 bg-blue-600 text-white">
      <div
        className={`flex gap-10 ml-140 text-[13px] ${currentUser && "hidden"}`}
      >
        <button>SAVE MORE ON APP</button>
        <button>BECOME A SELLER</button>
        <button>HELP & SUPPORT</button>
        <button
          onClick={() => navigate("/login")}
          className="hover:text-green-400 "
        >
          LOGIN
        </button>
        <button
          onClick={() => navigate("/register")}
          className="hover:text-green-400 "
        >
          SIGN UP
        </button>
        <button>LANG</button>
      </div>
      <div className="flex justify-center gap-20 w-full items-center">
        <div className="text-5xl font-mono cursor-pointer">Hell'O</div>
        <div className="flex  w-200 h-12 items-center rounded bg-white text-black ">
          <input
            type="text"
            className="border-none outline-0  w-full p-2"
            placeholder="Search here"
          />
          <Search className="bg-blue-500 h-full w-10 " />
        </div>
        <div>
          <ShoppingCart size={30} />
        </div>
      </div>
    </div>
  );
};

export default Header;
