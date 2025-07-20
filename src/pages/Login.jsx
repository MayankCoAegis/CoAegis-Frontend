import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";
import { loginUser } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";
import { useLoader } from "../contexts/LoaderContext";
import { isTokenExpired } from "../api/authUtils";
import { forgotPasswordAPI } from "../api/user";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Forgot Password
  const [email, setEmail] = useState("");

  const { setShowSnackBar, setMessage } = useAlert();
  const { user, setUser } = useAuth();
  const { setLoading } = useLoader();
  const [showForgetPasswordDiv, setShowForgetPasswordDiv] = useState(false);

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        throw new Error("Username and password are required");
      }
      setLoading(true); // Start loading
      const result = await loginUser(username, password);
      setLoading(false); // Stop loading
      if (result.success) {
        localStorage.setItem("accessToken", result.access_token); // Store token in localStorage
        localStorage.setItem("refreshToken", result.refresh_token); // Store token in localStorage

        setMessage("User logged in successfully");
        setShowSnackBar(true);
        navigate("/chat");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setLoading(false); // Stop loading
      //  console.error("Login failed:", err);
      setMessage(err.message);
      setShowSnackBar(true);
    }
  };

  const handleInputChange = (e, field) => {
    if (field === "username") {
      setUsername(e.target.value);
    } else if (field === "password") {
      setPassword(e.target.value);
    }
    else if (field === "email") {
      setEmail(e.target.value);
    }
  };

  const handleForgotPassword=async()=>{
    if(!email)
    {
      setMessage("Email is required");
      setShowSnackBar(true);
      return;
    }
    setLoading(true);
    const response=await forgotPasswordAPI(email);
    setLoading(false);
    if(response.success)
    {
      setMessage(response.message);
      setShowSnackBar(true);
    }
    else
    {
      setMessage(response.message);
      setShowSnackBar(true);
    }
  }

  //  useEffect(() => {
  //     setLoading(true);
  //     const refreshToken=localStorage.getItem("refreshToken");
  //     setLoading(false)
  //     if(refreshToken && isTokenExpired(refreshToken))
  //     {
  //       console.log("User Already Logged in");
  //       navigate("/chat")
  //     }

  //   }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-[url('/bglogin3.jpg')] bg-[url('/17580.jpg')] bg-cover bg-center  px-4">
      {showForgetPasswordDiv ? (
        <div className="flex flex-col md:flex-row w-full md:w-3/5 max-w-5xl h-auto md:h-3/4 rounded-2xl shadow-lg/30 dark:bg-neutral-900 bg-[#ffffff] overflow-hidden">
          <div className="w-full h-auto py-10 px-6 md:px-8 flex flex-col dark:text-white text-gray-700">
            {/* Header */}
            <div className="flex flex-col gap-1 mb-8">
              <p className="!text-2xl font-semibold">Forgot Password</p>
              <p className="!text-sm dark:text-gray-400 text-gray-800">Enter you email and we'll get back to you!</p>
            </div>

            {/* Form */}
            <div className="flex flex-col flex-1 justify-center gap-6">
              <div className="flex flex-col gap-6">
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm dark:text-gray-400 text-gray-700">Registered Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="text-sm dark:bg-neutral-800 bg-gray-200 dark:text-gray-300 text-gray-800 dark:placeholder-gray-500 placeholder-gray-700 border dark:border-gray-700 border-gray-200 rounded-md p-2 outline-none dark:focus:ring-2 focus:ring-0 focus:ring-cyan-600"
                    value={email}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                </div>

                {/* Button */}
                <div className="flex flex-row justify-between items-center">
                  <button
                    className="dark:bg-cyan-600 bg-cyan-500 hover:bg-cyan-500 text-white text-xs md:text-sm   rounded-md px-6 py-2 shadow-md transition duration-200 ease-in-out hover:scale-105"
                    onClick={handleForgotPassword}
                  >
                    Send Reset Link
                  </button>
                </div>
              </div>

             

              {/* Register Link */}
              <p className="text-xs text-center dark:text-gray-400 text-gray-700 transition duration-200 ease-in-out hover:scale-105">
                Return to{" "}
                <span
                  className="text-cyan-400 cursor-pointer hover:underline transition duration-200 ease-in-out hover:scale-105"
                  onClick={() => setShowForgetPasswordDiv(false)}
                >
                  Login
                </span>
              </p>
            </div>
          </div>

        </div>
      ) : (
        <div className="flex flex-col md:flex-row w-full md:w-3/5 max-w-5xl h-auto md:h-3/4 rounded-2xl shadow-lg/30 dark:bg-neutral-900 bg-[#ffffff] overflow-hidden">
          {/* Left Image */}
          <div className="w-full md:w-3/5 h-64 md:h-auto md:block hidden md:flex md-items-center md:justify-center relative">
            {/* <img
            src="/profile2.jpg"
            alt="Login"
            className="h-full w-full object-cover bg"
          /> */}
            <h1 className="dark:text-white text-gray-700 text-7xl font-medium text-shadow-lg items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
              Co<span className="dark:text-cyan-400 text-cyan-500">Aegis</span>
            </h1>
          </div>

          {/* Right Form */}
          <div className="w-full md:w-2/5 h-auto py-10 px-6 md:px-8 flex flex-col dark:text-white text-gray-700">
            {/* Header */}
            <div className="flex flex-col gap-1 mb-4">
              <p className="text-2xl font-semibold">Sign In</p>
              <p className="text-sm dark:text-gray-400 text-gray-800">Welcome back!</p>
            </div>

            {/* Form */}
            <div className="flex flex-col flex-1 justify-center gap-6">
              <div className="flex flex-col gap-6">
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm dark:text-gray-400 text-gray-700">Username</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    className="text-sm dark:bg-neutral-800 bg-neutral-200 dark:text-gray-300 text-gray-800 dark:placeholder-gray-500 placeholder-gray-600 border dark:border-gray-700 border-gray-200 rounded-md p-2 outline-none dark:focus:ring-2 focus:ring-0 focus:ring-cyan-600"
                    value={username}
                    onChange={(e) => handleInputChange(e, "username")}
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm dark:text-gray-400 text-gray-700">Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="text-sm dark:bg-neutral-800 bg-neutral-200 dark:text-gray-300 text-gray-800 dark:placeholder-gray-500 placeholder-gray-600 border dark:border-gray-700 border-gray-200 rounded-md p-2 outline-none dark:focus:ring-2 focus:ring-0 focus:ring-cyan-600"
                    value={password}
                    onChange={(e) => handleInputChange(e, "password")}
                  />
                </div>

                {/* Forgot + Login */}
                <div className="flex flex-row justify-between items-center">
                  <p className="text-xs text-cyan-400 cursor-pointer hover:underline transition duration-200 ease-in-out hover:scale-105" onClick={() => setShowForgetPasswordDiv(true)}>
                    Forgot Password?
                  </p>
                  <button
                    className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm rounded-md px-6 py-2 shadow-md transition duration-200 ease-in-out hover:scale-105"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </div>

              {/* Google Sign In */}
              {/* <button className="bg-neutral-800 text-sm text-gray-400 border border-gray-700 rounded-md px-4 py-2 flex items-center justify-center gap-3 hover:bg-gray-800 transition duration-200 ease-in-out hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
        <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg> 
              Continue with Google
            </button> */}

              {/* Register Link */}
              <p className="text-xs text-center dark:text-gray-400 text-gray-600 transition duration-200 ease-in-out hover:scale-105">
                Don't have an account?{" "}
                <span
                  className="text-cyan-400 cursor-pointer hover:underline transition duration-200 ease-in-out hover:scale-105"
                  onClick={() => navigate("/register")}
                >
                  Register Here
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
