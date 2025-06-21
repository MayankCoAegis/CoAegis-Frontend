import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /chat if user is authenticated
    navigate("/chat")
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 w-full">
      <h1>Home Page</h1>
      
    </div>
  );
}

export default Home;