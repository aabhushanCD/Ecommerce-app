const Card = ({ children, className = "" }) => {
  return <div className={`shadow-md ${className}`}>{children}</div>;
};

export { Card };
