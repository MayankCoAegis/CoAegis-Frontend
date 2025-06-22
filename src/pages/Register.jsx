import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAlert } from "../contexts/AlertContext";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const {  setShowSnackBar,setMessage } = useAlert();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
    <div className="flex items-center justify-center min-h-screen bg-[url('/bglogin2.jpg')] bg-cover bg-center px-4">
      
      <div className="flex flex-col my-4 md:m-0 md:flex-row w-full md:w-3/5 max-w-5xl h-auto md:h-3/4 rounded-2xl shadow-lg bg-neutral-900 overflow-hidden">
        {/* Left Image */}
        <div className="w-full md:w-3/5  md:block hidden">
          <img src="/profile2.jpg" alt="Register" className="h-full w-full object-cover" />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-2/5 py-10 px-6 md:px-8 flex flex-col text-white">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="flex flex-col gap-1 mb-4">
                <p className="text-2xl font-semibold">Register</p>
                <p className="text-sm text-gray-400">Create your account</p>
              </div>

              {/* Form */}
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-400">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    className="text-sm bg-neutral-800 text-gray-300 placeholder-gray-500 border border-gray-700 rounded-md p-2 outline-none focus:ring-2 focus:ring-cyan-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-400">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    className="text-sm bg-neutral-800 text-gray-300 placeholder-gray-500 border border-gray-700 rounded-md p-2 outline-none focus:ring-2 focus:ring-cyan-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-400">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    placeholder="Enter 10-digit phone number"
                    value={form.phone}
                    onChange={handleChange}
                    className="text-sm bg-neutral-800 text-gray-300 placeholder-gray-500 border border-gray-700 rounded-md p-2 outline-none focus:ring-2 focus:ring-cyan-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-400">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    className="text-sm bg-neutral-800 text-gray-300 placeholder-gray-500 border border-gray-700 rounded-md p-2 outline-none focus:ring-2 focus:ring-cyan-600"
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
              <p className="text-xs text-center text-gray-400 mt-4 transition hover:scale-105">
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
                <h2 className="text-xl font-semibold text-white">Check your inbox</h2>
                <p className="text-sm text-gray-400">
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
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
