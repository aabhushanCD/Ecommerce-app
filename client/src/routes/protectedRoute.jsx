import { useAuth } from "@/Store/store";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { currentUser, me } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      await me(); // check login
      setChecking(false); // completed
    };
    verifyUser();
  }, []);

  useEffect(() => {
    if (!checking && !currentUser) {
      navigate("/login");
    }
  }, [checking, currentUser, navigate]);

  // 🔵 Show loader until fully checked
  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen text-xl gap-2">
        Hell'O <Loader className="animate-spin" />
      </div>
    );
  }

  // 🔵 Only show children if user exists
  if (currentUser) {
    return <>{children}</>;
  }

  return null;
}

export default ProtectedRoute;
