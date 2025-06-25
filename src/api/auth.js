// src/api/auth.js
import axios from "axios";
import { isTokenExpired } from "./authUtils";

// Base URL can point to your backend server
const API = axios.create({
  baseURL: "https://coaegis-backend.onrender.com",
  timeout: 5000,
});

// helper API without interceptor
const API2 = axios.create({
  baseURL: "https://coaegis-backend.onrender.com",
  timeout: 5000,
});

// Request Interceptor – attach access token
API.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("accessToken");

  if (token && isTokenExpired(token)) {
    console.log("Access token expired — refreshing...");
    token = await refreshAccessToken();
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export const loginUser = async (username, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await API2.post("/login", formData, {
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
        access_token: response.access_token,
        refresh_token: response.refresh_token,
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
    console.log("Sending Refresh Token...");
    const refresh_token = localStorage.getItem("refreshToken");
    const formData = new URLSearchParams();
    formData.append("refresh_token", refresh_token);

    const response = await API2.post("/token", formData, {
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
    console.log("Error in login:", error);
    return null;
  }
};
