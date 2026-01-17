  import { useAuth } from "@/Store/store";
  import { Navigate } from "react-router-dom";

  function PublicRoute({ children }) {
    const { currentUser, loading } = useAuth();

    if (loading) return null;
    if (currentUser) {
      if (currentUser.role === "admin") return <Navigate to="/admin" replace />;
      if (currentUser.role === "seller") return <Navigate to="/seller" replace />;
      return <Navigate to="/" replace />;
    }
    return children;
  }

  export default PublicRoute;
