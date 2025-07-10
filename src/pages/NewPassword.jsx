import { useEffect, useState } from "react";
import { useLoader } from "../contexts/LoaderContext";
import { useSearchParams } from "react-router-dom";
import { VerifyUser } from "../api/auth";
import { useAlert } from "../contexts/AlertContext";
import { NewPasswordAPI } from "../api/user";

function NewPassword() {
  const { setLoading } = useLoader();
  const { setMessage, setShowSnackBar } = useAlert();
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);

  const handleSend = async () => {
    const token = searchParams.get("token");

    if (!password) {
      setMessage("Password cannot be empty!");
      setShowSnackBar(true);
      return;
    }
    if (!token) {
      setMessage("Token Not Found");
      setShowSnackBar(true);
      return;
    }
    setLoading(true);
    const response = await NewPasswordAPI(token, password);
    if (response.success) {
      setMessage(response.message);
      setShowSnackBar(true);
      setIsRequestSent(true);
      setLoading(false);
    } else {
      setMessage(response.message);
      setShowSnackBar(true);
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/bglogin3.jpg')] bg-cover bg-center] px-4">
      <div className="flex flex-col md:flex-row w-full md:w-3/5 max-w-5xl h-auto md:h-3/4 rounded-2xl shadow-lg/30 bg-neutral-900  overflow-hidden">
        {/* Left Image */}
        <div className="w-full md:w-3/5 h-64 md:h-auto md:block hidden md:flex md-items-center md:justify-center relative">
          {/* <img
            src="/profile2.jpg"
            alt="Login"
            className="h-full w-full object-cover bg"
          /> */}
          <h1 className="text-white text-7xl font-medium text-shadow-lg items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            Co<span className="text-cyan-400">Aegis</span>
          </h1>
        </div>
        {isRequestSent ? (
          <div className="w-full md:w-2/5 h-auto py-10 px-6 md:px-8 flex flex-col gap-2 text-white">
            <h1 className="text-2xl font-semibold mb-4">
              Password Reset Successfully!
            </h1>
            <p className="text-gray-200 text-xs md:text-sm">
              Your password has been successfully reset. You can now log in with
              your new password.
            </p>
          </div>
        ) : (
          <div className="w-full md:w-2/5 h-auto py-10 px-6 md:px-8 flex flex-col gap-2 text-white">
            <label className="block text-sm text-gray-200 mb-1">
              Enter New Password:
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="text-gray-100 text-sm bg-[#1f1f1f] border border-[#3a3a3a] rounded-md px-4 py-2 mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md mt-2 "
              onClick={handleSend}
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewPassword;
