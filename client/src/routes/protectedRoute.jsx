import { ServerApi } from "@/constant";
import { useAuth } from "@/Store/store";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { currentUser, me, isLoading } = useAuth();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const checkuser = async () => {
      await me();
      setChecked(true);
    };
    checkuser();
  }, []);
  useEffect(() => {
    if (checked && !currentUser) {
      navigate("/login");
    }
  }, [checked, navigate, currentUser]);

  if (!currentUser && isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Hell'O <Loader className="animate-spin" />
      </div>
    );
  }
  return <>{children}</>;
}
export default ProtectedRoute;
