import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  if (!auth.user && !user) {
    return <Navigate to="/signin" state={{ path: location.pathname }} />;
  }
  return children;
};
