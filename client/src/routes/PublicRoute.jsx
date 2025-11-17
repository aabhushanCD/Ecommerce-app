import { useAuth } from "@/Store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // ⛔ If logged in, return nothing (prevent UI flash)
  if (currentUser) return null;

  return <>{children}</>;
}

export default PublicRoute;
