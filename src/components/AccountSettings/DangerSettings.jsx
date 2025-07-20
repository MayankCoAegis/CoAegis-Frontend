import { useNavigate } from "react-router-dom";
import { DeleteAllChats } from "../../api/chat";
import { deleteUser } from "../../api/user";
import { useAlert } from "../../contexts/AlertContext";
import { useLoader } from "../../contexts/LoaderContext";


export default function DangerSettings({setChatHistory}){

  const {setLoading}=useLoader();
  const {setMessage,setShowSnackBar}=useAlert();
  const navigate=useNavigate();
  const handleDeleteChats=async()=>{
    setLoading(true);
    const response=await DeleteAllChats();
    setLoading(false);
    if(response.success)
    {
      setMessage(response.message);
      setShowSnackBar(true);
      setChatHistory([]);
      navigate("/chat");
    }
    else
    {
      setMessage(response.message);
      setShowSnackBar(true);
    }
  }
  const handleDeleteAccount=async()=>{
    setLoading(true);
    const response=await deleteUser();
    setLoading(false);
    if(response.success)
    {
      navigate("/login");
    }
    else
    {
      setMessage(response.message);
      setShowSnackBar(true);
    }
  }
    return <div className="text-white p-6 max-w-xl mx-auto space-y-6">
  


  {/* <!-- Delete Chat History --> */}
  <div className="flex flex-col md:flex-row gap-4 md:gap-2 md:items-center justify-between">
    <div className="md:w-3/5">
    <p className="dark:!text-red-300 text-red-500 !text-sm !font-semibold">Delete All Chat History</p>
    <p className="dark:!text-gray-300 text-gray-700 !text-xs">Permanently delete all your chat conversations</p>
    </div>
    <div>
    <button
    onClick={handleDeleteChats} 
    className="!text-xs bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition duration-200">
      Delete History
    </button>
    </div>
  </div>

  <hr className="border-gray-700" />

  {/* <!-- Delete Account --> */}
  <div className="flex flex-col md:flex-row gap-4 md:gap-2 md:items-center justify-between">
    <div className="md:w-3/5">
    <p className="dark:!text-red-300 text-red-500 !text-sm font-semibold">Delete Account</p>
    <p className="dark:!text-gray-300 text-gray-700 !text-xs">Permanently delete your CoAegis account</p>
    </div>
    <div>
    <button
    onClick={handleDeleteAccount} 
    className="!text-xs bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition duration-200">
      Delete Account
    </button>
    </div>
  </div>
</div>

}