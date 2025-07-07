import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useAlert } from "../contexts/AlertContext";
import { useLoader } from "../contexts/LoaderContext";

import { isTokenExpired } from "../api/authUtils";
import { getUser } from "../api/user";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useAuth();
  const {loading, setLoading} = useLoader();
 const {setShowSnackBar,setMessage}=useAlert()

  useEffect(() => {
     setLoading(true); // Start loading
  const checkAuth = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    ;
    if (refreshToken && !isTokenExpired(refreshToken)) {
      try {
        // const userData = await verifyTokenAndGetUser(token);
        console.log("refresh token valid")
        const response=await getUser();
        // console.log("response from get User",response)
       if(response.success)
        setUser(response.user);
      else
      throw new Error("Cannot fetch user")
      } catch (error) {
        setMessage(error.message)
        setShowSnackBar(true);
        // console.error(error);
        setUser(null); // Clear user state if token is invalid
      } finally {
        setLoading(false);
      }
    } else {
    
        console.log("No RefreshToken found, Redirecting to Login");
        setMessage("Session Expired, Please log in again");
        setShowSnackBar(true);
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
