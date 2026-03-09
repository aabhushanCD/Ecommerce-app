import { useAuth } from "@/Store/store";
import { Navigate, Outlet } from "react-router-dom";

const roleRedirectMap = {
  admin: "/admin",
  seller: "/seller",
  customer: "/",
};

function PublicRoute() {
  const { currentUser, loading } = useAuth();

if (loading) return <div>Loading...</div>;

  if (currentUser) {
    return <Navigate to={roleRedirectMap[currentUser.role] || "/"} replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
