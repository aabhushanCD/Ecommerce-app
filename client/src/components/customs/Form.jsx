import React from "react";

const Form = ({ children, ...props }) => {
  return (
    <form {...props} className="space-y-4 ">
      {children}
    </form>
  );
};

export { Form };
