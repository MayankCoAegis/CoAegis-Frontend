import { useEffect, useState } from "react";
import { useLoader } from "../contexts/LoaderContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VerifyUser } from "../api/auth";
import { useAlert } from "../contexts/AlertContext";


function Verify() {
    const {setLoading}=useLoader();
    const {setMessage,setShowSnackBar}=useAlert();
    const [isRequestSent, setIsRequestSent] = useState(false);
     const [searchParams] = useSearchParams();
     const navigate=useNavigate();


     const handleLogin=async(access_token,refresh_token)=>{
        localStorage.setItem("accessToken", access_token); // Store token in localStorage
        localStorage.setItem("refreshToken", refresh_token); // Store token in localStorage
  
      
      setMessage("User logged in successfully");
      setShowSnackBar(true);
      navigate("/chat");
     }

    useEffect(()=>{

        const SendReq=async()=>{
            const response=await VerifyUser(token);
            if(response.success){
                setMessage(response.message);
                setShowSnackBar(true);
                setIsRequestSent(true);
                setLoading(false);
                handleLogin(response.access_token,response.refresh_token);
            }
            else
            {
                setMessage(response.message);
                setShowSnackBar(true);
                setLoading(false);
            }
        }
        const token = searchParams.get("token");
        console.log('token',token);
        setLoading(true);
        if(!token)
        {
            setMessage("Invalid verification URL");
            setShowSnackBar(true);
            setLoading(false);
            return;
        }
        SendReq();


    },[])
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl !font-medium mb-4 text-gray-200">{isRequestSent ? "Verification successfull" : "Couldn't send verification request"}</h1>
            </div>
        );
    }

export default Verify