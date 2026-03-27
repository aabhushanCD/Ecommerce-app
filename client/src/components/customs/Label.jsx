const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm text-gray-600 tracking-wide block mb-1  "
    >
      {children}
    </label>
  );
};

export { Label };
