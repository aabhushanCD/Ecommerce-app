import { useAuth } from "@/features/auth/store";
import { Navigate, Outlet } from "react-router-dom";

const roleRedirectMap = {
  admin: "/admin",
  seller: "/seller/dashboard",
  customer: "/",
};

function PublicRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (currentUser) {
    return <Navigate to={roleRedirectMap[currentUser.role] || "/"} replace />;
  }

  return [children];
}

export default PublicRoute;
