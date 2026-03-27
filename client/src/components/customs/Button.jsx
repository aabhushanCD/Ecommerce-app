import React from "react";

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full py-3 rounded-xl text-white font-semibold 
              bg-linear-to-r from-green-400 to-emerald-500
              hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;
