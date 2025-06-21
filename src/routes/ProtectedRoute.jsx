import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
//   console.log("ProtectedRoute user:", user);
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
