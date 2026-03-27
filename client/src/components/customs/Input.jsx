const Input = ({ className = "", icon: Icon, ...props }) => {
  return (
    <div className="flex items-center border-2 px-2 rounded-xl py-2">
      {Icon && <Icon className="text-gray-400 mr-2" size={18} />}
      <input
        {...props}
        className={`outline-none  w-full rounded-md font-medium font-serif ${className}`}
      />
    </div>
  );
};

export { Input };
