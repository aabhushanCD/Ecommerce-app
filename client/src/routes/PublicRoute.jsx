import { useAuth } from "@/Store/store";
import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      return navigate("/");
    }
  }, [navigate, currentUser]);
  return { children };
}

export default PublicRoute;
