import { useEffect, useState } from "react";
import { useLoader } from "../contexts/LoaderContext";
import { useSearchParams } from "react-router-dom";
import { VerifyUser } from "../api/auth";
import { useAlert } from "../contexts/AlertContext";
import { NewPasswordAPI } from "../api/user";


function NewPassword() {
    const {setLoading}=useLoader();
    const {setMessage,setShowSnackBar}=useAlert();
    const [isRequestSent, setIsRequestSent] = useState(false);
     const [searchParams] = useSearchParams();
     const [password,setPassword]=useState('');

    useEffect(()=>{
    },[])

    const handleSend = async () => {
        const token = searchParams.get("token");
        if(!token)
        {
            setMessage("Token Not Found");
            setShowSnackBar(true);
            return;
        }
        setLoading(true);
        const response=await NewPasswordAPI(token,password);
        if(response.success){
            setMessage(response.message);
            setShowSnackBar(true);
            setIsRequestSent(true);
            setLoading(false);
        }
        else
        {
            setMessage(response.message);
            setShowSnackBar(true);
            setLoading(false);
        }
    };
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <label className="block text-sm text-gray-200 mb-1">Enter New Password:</label>
                <input
                type="password"
                placeholder="Enter Password"
                className="text-gray-100 text-sm bg-[#1f1f1f] border border-[#3a3a3a] rounded-md px-4 py-2 mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md"
                onClick={handleSend}
                >
                Reset Password
                </button>
            </div>
        );
    }

export default NewPassword