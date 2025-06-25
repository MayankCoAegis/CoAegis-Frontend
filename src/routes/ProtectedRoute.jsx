import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useAlert } from "../contexts/AlertContext";
import { useLoader } from "../contexts/LoaderContext";

import { isTokenExpired } from "../api/authUtils";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useAuth();
  const {loading, setLoading} = useLoader();
 

  useEffect(() => {
     setLoading(true); // Start loading
  const checkAuth = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    ;
    if (refreshToken && isTokenExpired(refreshToken)) {
      try {
        // const userData = await verifyTokenAndGetUser(token);
        let dummyUser={
           id: 1,
            name: "Test User",
            email: "test@gmail.com",
      }
        setUser(dummyUser);
      } catch (error) {
        console.error(error.message);
        setUser(null); // Clear user state if token is invalid
      } finally {
        setLoading(false);
      }
    } else {
    
        console.log("No RefreshToken found, Redirecting to Login");
        setUser(null); // Ensure user state is cleared if no token
        window.location.href = "/login"; // Redirect to login
      
      setLoading(false); // Ensure loading stops
    }
  };

  checkAuth();
}, []); // Only run once on mount — do not depend on [user]


 return user && children
};

export default ProtectedRoute;
