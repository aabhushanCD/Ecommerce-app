import React from "react";

const Error = ({ children }) => {
  return (
    <div className="flex text-2xl text-red-900 w-100 overflow-clip">
      {children}
    </div>
  );
};

export default Error;
