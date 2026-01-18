import { useAuth } from "@/Store/store";
import { Navigate } from "react-router-dom";

const roleRedirectMap = {
  admin: "/admin",
  seller: "/seller",
  customer: "/",
};

function PublicRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return null;

  if (currentUser) {
    return <Navigate to={roleRedirectMap[currentUser.role] || "/"} replace />;
  }

  return children;
}

export default PublicRoute;
