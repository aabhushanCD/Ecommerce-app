const Card = ({ children, className = "" }) => {
  return (
    <div className={`backdrop-blur-xl shadow-2xl ${className}`}>{children}</div>
  );
};

export { Card };
