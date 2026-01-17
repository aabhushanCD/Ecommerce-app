import { useAuth } from "@/Store/store";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRoles, children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null; // or spinner
  }
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    console.log(allowedRoles);
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
