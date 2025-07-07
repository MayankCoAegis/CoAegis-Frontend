import { useEffect, useState } from "react";
import { useLoader } from "../contexts/LoaderContext";
import { useSearchParams } from "react-router-dom";
import { VerifyUser } from "../api/auth";
import { useAlert } from "../contexts/AlertContext";


function Verify() {
    const {setLoading}=useLoader();
    const {setMessage,setShowSnackBar}=useAlert();
    const [isRequestSent, setIsRequestSent] = useState(false);
     const [searchParams] = useSearchParams();

    useEffect(()=>{

        const SendReq=async()=>{
            const response=await VerifyUser(token);
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
        }
        const token = searchParams.get("token");
        console.log('token',token);
        setLoading(true);
        if(!token)
        {
            setMessage("Token Not Found");
            setShowSnackBar(true);
            return;
        }
        SendReq();


    },[])
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">{isRequestSent ? "Verification email sent successfully" : "Couldn't send verification request"}</h1>
            </div>
        );
    }

export default Verify