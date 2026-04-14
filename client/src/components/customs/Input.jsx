import { forwardRef } from "react";

const Input = forwardRef(({ className = "", icon: Icon, ...props }, ref) => {
  return (
    <div className="flex items-center border-2 border-gray-200 px-3 rounded-xl py-2 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all bg-white">
      {Icon && <Icon className="text-gray-400 mr-2" size={18} />}
      <input
        ref={ref}
        {...props}
        className={`outline-none w-full bg-transparent rounded-md font-medium text-gray-800 placeholder:text-gray-400 ${className}`}
      />
    </div>
  );
});

Input.displayName = "Input";

export { Input };
