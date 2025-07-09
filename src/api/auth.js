// src/api/auth.js
import axios from "axios";
import { isTokenExpired } from "./authUtils";

// Base URL can point to your backend server
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
});

// helper API without interceptor
const API2 = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
});

// Request Interceptor – attach access token
// API.interceptors.request.use(async (config) => {
//   let token = await localStorage.getItem("accessToken");
//  console.log("Token",token)
//   if (token && isTokenExpired(token)) {
//     console.log("Access token expired — refreshing...",token);
//     token = await refreshAccessToken();
//   }

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

API.interceptors.request.use(async (config) => {
  
  let token = localStorage.getItem("accessToken"); // Remove await - not needed for localStorage
  
  if (token && isTokenExpired(token)) {
    console.log("Access token expired — refreshing...", token);
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
    console.log('Authorization Header added:', config.headers.Authorization);
   
  } else {
    console.log("No token available - request will be sent without Authorization header");
  }

  return config;
});

// Helper function to check what's actually in localStorage
export const debugLocalStorage = () => {
  console.log("=== localStorage Debug ===");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}:`, value);
  }
  console.log("========================");
};

// Call this function in your browser console to see all stored data
// debugLocalStorage();

export const loginUser = async (username, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await API2.post("/login/", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(response);

    // Assuming backend returns access and refresh tokens
    if (response.data.access_token && response.data.refresh_token) {
      return {
        success: true,
        message: "User Logged in Successfully",
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      };
    } else {
      return { success: false, message: "Login failed" };
    }
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.detail || error.message,
    };
  }
};

export const refreshAccessToken = async () => {
  try {
    const refresh_token = await localStorage.getItem("refreshToken");
    console.log("Sending Refresh Token...",refresh_token);
    const formData = new URLSearchParams();
    formData.append("refresh_token", refresh_token);

    const response = await API2.post("/token/", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("Response of refreshAccessToken", response);
    if (response.data.access_token) {
      localStorage.setItem("accessToken", response.data.access_token);
      return response.data.access_token;
    } else throw new Error("Refresh Failed");
  } catch (error) {
    console.error("Error in login:", error);
    return null;
  }
};

export const registerUser = async (form) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("email", form.email);
    formData.append("contact", form.phone);

    const response = await API2.post("/register/", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log("Response from Register User:", response);
    if (response.data.message == "User created successfully.") {
      return {
        success: true,
        message: response.data.message,
      };
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.detail || error.message,
    };
  }
};




export const VerifyUser = async (token) => {
  try {
    
    const response = await API.get(`/verify/${token}/`);
    console.log("Response from Verification API:", response);
    if (response.data.message) {
      return {
        success: true,
        message: response.data.message,
      };
    } else {
      throw new Error("Verification failed");
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.detail || error.message,
    };
  }
};