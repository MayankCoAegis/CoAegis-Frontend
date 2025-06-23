import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useAlert } from "../contexts/AlertContext";
import { useLoader } from "../contexts/LoaderContext";
import { verifyTokenAndGetUser } from "../api/auth";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useAuth();
 

 

 return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
