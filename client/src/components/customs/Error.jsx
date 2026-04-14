import React from "react";

const Error = ({ children }) => {
  return (
    <div className="flex text-md justify-center items-center text-red-600 w-full overflow-hidden">
      {children}
    </div>
  );
};

export default Error;
