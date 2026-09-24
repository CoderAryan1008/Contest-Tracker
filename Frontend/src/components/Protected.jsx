import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import Loader from "./Loader";

function Protected({ children }) {
  const { user, loader } = useAuth();

  if (loader) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Protected;