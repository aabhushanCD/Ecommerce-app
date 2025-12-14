import { Navigate } from "react-router-dom";
import { useAuth } from "@/Store/store";

const SellerRoutes = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== "seller") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default SellerRoutes;
