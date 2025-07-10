// src/api/auth.js
import axios from "axios";
import { isTokenExpired } from "./authUtils";
import { refreshAccessToken } from "./auth";

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


export const getUser = async () => {
  try {
    const response = await API.get("/user/");

    // Assuming backend returns access and refresh tokens
    if (response.data.id) {
      return {
        success: true,
        message: "User Fetched Successfully",
        user: response.data,
      };
    }
    else
    {
      return {
        success:false,
        message:"User fetch failed"
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

export const NewPasswordAPI = async (token,newPassword) => {
  try {
    const formData = new URLSearchParams();
      formData.append("verification_token", token);
      formData.append("password", newPassword);
    const response = await API.post("/newpass/",formData);

    // Assuming backend returns access and refresh tokens
    if (response.data) {
      return {
        success: true,
        message: "New Password Request Successfully",
      };
    }
    else
    {
      return {
        success:false,
        message:"New Password Request failed"
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


export const changePasswordAPI = async (oldPassword,newPassword) => {
  try {
    const formData = new URLSearchParams();
      formData.append("current_password", oldPassword);
      formData.append("new_password", newPassword);
    const response = await API.post("/resetpass/",formData);
    // console.log("Response from changePasswordAPI:", response);

    // Assuming backend returns access and refresh tokens
    if (response.data) {
      return {
        success: true,
        message: "Password Reset Successfully",
      };
    }
    else
    {
      return {
        success:false,
        message:"New Password Request failed"
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

export const forgotPasswordAPI = async (email) => {
  try {
    const formData = new URLSearchParams();
      formData.append("email", email);
    const response = await API2.post("/forgotpass/",formData);
    console.log("Response from forgotPasswordAPI:", response);

    // Assuming backend returns access and refresh tokens
    if (response.data) {
      return {
        success: true,
        message:response.data.message,
      };
    }
    else
    {
      return {
        success:false,
        message:"Forgot Password Request failed"
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