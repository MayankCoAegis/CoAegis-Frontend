import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAlert } from "../contexts/AlertContext";
import { useLoader } from "../contexts/LoaderContext";
import {registerUser} from '../api/auth';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", phone: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const {  setShowSnackBar,setMessage } = useAlert();

  const {setLoading}=useLoader();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const response=await registerUser(form);
    setLoading(false);
    if(response.success)
    {
      // Email Verification

      setSubmitted(true);
    }
    else
    {
      setMessage(response.message);
      setShowSnackBar(true);
    }
  };

  const handleCodeVerify = () => {
    if (verificationCode === "000000") {

      setMessage("Registration successful! Please log in.");
      setShowSnackBar(true);
      navigate("/login");
    } else {
      setError("Invalid code. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-[url('/bglogin3.jpg')] bg-[url('/17580.jpg')] bg-cover bg-center px-4">
      
      <div className="flex flex-col my-4 md:m-0 md:flex-row w-full md:w-3/5 max-w-5xl h-auto md:h-3/4 rounded-2xl shadow-lg dark:bg-neutral-900 bg-[#ffffff] overflow-hidden">
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
        <div className="w-full md:w-2/5 py-10 px-6 md:px-8 flex flex-col dark:text-white text-gray-700">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="flex flex-col gap-1 mb-4">
                <p className="text-2xl font-semibold">Register</p>
                <p className="text-sm dark:text-gray-400 text-gray-800">Create your account</p>
              </div>

              {/* Form */}
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                  <label className="text-sm dark:text-gray-400 text-gray-800">Username</label>
                  <input
                    type="text"
                    name="username"
                    required
                    placeholder="Enter your name"
                    value={form.username}
                    onChange={handleChange}
                    className="text-sm dark:bg-neutral-800 bg-neutral-200 dark:text-gray-300 text-gray-800 dark:placeholder-gray-500 placeholder-gray-600 border dark:border-gray-700 border-gray-200 rounded-md p-2 outline-none dark:focus:ring-2 focus:ring-0 focus:ring-cyan-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm dark:text-gray-400 text-gray-800">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    className="text-sm dark:bg-neutral-800 bg-neutral-200 dark:text-gray-300 text-gray-800 dark:placeholder-gray-500 placeholder-gray-600 border dark:border-gray-700 border-gray-200 rounded-md p-2 outline-none dark:focus:ring-2 focus:ring-0 focus:ring-cyan-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm dark:text-gray-400 text-gray-800">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    placeholder="Enter 10-digit phone number"
                    value={form.phone}
                    onChange={handleChange}
                    className="text-sm dark:bg-neutral-800 bg-neutral-200 dark:text-gray-300 text-gray-800 dark:placeholder-gray-500 placeholder-gray-600 border dark:border-gray-700 border-gray-200 rounded-md p-2 outline-none dark:focus:ring-2 focus:ring-0 focus:ring-cyan-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm dark:text-gray-400 text-gray-800">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    className="text-sm dark:bg-neutral-800 bg-neutral-200 dark:text-gray-300 text-gray-800 dark:placeholder-gray-500 placeholder-gray-600 border dark:border-gray-700 border-gray-200 rounded-md p-2 outline-none dark:focus:ring-2 focus:ring-0 focus:ring-cyan-600"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm rounded-md px-6 py-2 shadow-md transition duration-200 ease-in-out hover:scale-105"
                >
                  Register
                </button>
              </form>
              

              {/* Login redirect */}
              <p className="text-xs text-center dark:text-gray-400 text-gray-800 mt-4 transition hover:scale-105">
                Already have an account?{" "}
                <span
                  className="text-cyan-400 cursor-pointer hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login Here
                </span>
              </p>
            </>
          ) : (
            <>
              {/* Verification Section */}
              <div className="flex flex-col gap-4 justify-center flex-1 text-center">
                <h2 className="!text-md md:!text-lg font-medium dark:!text-gray-200 text-gray-800">Check your inbox for email verification.</h2>
                {/* <p className="text-sm text-gray-400">
                  Enter the verification code we just sent to{" "}
                  <span className="text-cyan-400">{form.email}</span>.
                </p>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter verification code"
                  className="text-center text-sm bg-neutral-800 text-gray-300 border border-gray-700 rounded-md p-2 outline-none focus:ring-2 focus:ring-cyan-600"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  onClick={handleCodeVerify}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm rounded-md px-6 py-2 shadow-md transition duration-200 ease-in-out hover:scale-105"
                >
                  Verify
                </button> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
