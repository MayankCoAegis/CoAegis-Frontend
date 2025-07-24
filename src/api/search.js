import axios from "axios";
import { isTokenExpired } from "./authUtils";
import { refreshAccessToken } from "./auth";

// Base URL can point to your backend server
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});



// helper API without interceptor
const API2 = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
});

API.interceptors.request.use(async (config) => {
  
  let token = localStorage.getItem("accessToken"); // Remove await - not needed for localStorage
  
  if (token && isTokenExpired(token)) {
    // console.log("Access token expired — refreshing...", token);
    try {
      token = await refreshAccessToken();
      console.log("New token after refresh:", token);
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Handle refresh failure (redirect to login, etc.)
      token = null;
    }
  }
  else
  console.log("Access Token valid")

  if (token) {

    config.headers.Authorization = `Bearer ${token}`;
     config.headers['ngrok-skip-browser-warning'] = 'true';
    // console.log('Authorization Header added:', config.headers.Authorization);
   
  } else {
    // console.log("No token available - request will be sent without Authorization header");
  }

  return config;
});


export const SearchChat = async (text) => {
  try {
    const response = await API.get(`/user/chats/search/${text}/`);

    
    if (response.data) {
        // console.log("Response from SearchChat API:", response);
      return {
        success: true,
        message: "Search chats Fetched Successfully",
        chats: response?.data,
      };
    }
    else
    {
      return {
        success:false,
        message:"Search chats fetch failed"
      }
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.detail || error.message,
    };
  }
};