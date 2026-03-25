import { useAuth } from "@/features/auth/store";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, loading } = useAuth(); 

  if (loading) {
    return null; // or spinner
  }
  if (!currentUser && !loading) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    console.log(allowedRoles);
    return <Navigate to="/unauthorized" replace />;
  }

  return [children];
}

export default ProtectedRoute;
