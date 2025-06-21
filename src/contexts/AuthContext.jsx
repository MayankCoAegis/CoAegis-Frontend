import { createContext, useContext, useState, useEffect } from "react";
import { useLoader } from "./LoaderContext";

// Fixed dummy user fetch: return the Promise properly
const fetchUser = () => {
  return Promise.resolve({
    _id: "abc123",
    name: "John Doe",
    email: "john@example.com",
  });
};

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const {setLoading}=useLoader();

  useEffect(() => {
    try {
      setLoading(true); // Start loading
      // Fetch user data
      const userData = fetchUser();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
    

   
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
