import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 w-full">
      <h1>Login Page</h1>
      <p>Please enter your credentials to log in.</p>
      {/* Add your login form here */}
    </div>
  );
}

export default Login;
