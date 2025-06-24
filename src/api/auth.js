// src/api/auth.js
import axios from "axios";


// Base URL can point to your backend server
const API = axios.create({
  baseURL: "https://dummy-auth-server.com/api",
  timeout: 5000,
});

// Dummy function to get all user authentications
export const fetchAllAuthUsers = async () => {
  try {
    // Simulated fetch from a dummy backend
    const response = await API.get("/auth-users");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch auth users:", error);
    throw new Error("Failed to fetch auth users");
  }
};

// Dummy function to simulate login (optional)
export const loginUser = async (email, password) => {
  //   try {
  //     const response = await API.post('/login', { email, password });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     throw error;
  //   }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@gmail.com" && password === "password123") {
        resolve({
          success: true,
          message: "Login successful",
          token: "dummy-jwt-token",
          user: {
            id: 1,
            name: "Test User",
            email: "test@gmail.com",
          },
        });
      } else {
        reject({
          success: false,
          message: "User Not Found",
        });
      }
    }, 1000);
  });
};

// Dummy function to simulate login (optional)
export const getResponse = async (payload) => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
        resolve({
          success: true,
          message: "Response generated successfully",
          response:{
            text:"Unable to generate a response",
            code:"",
            image:""
          }
        })
          
    }, 2500);
  });
};

// 🟢 API to verify JWT and get user data
export const verifyTokenAndGetUser = async (token) => {
  try {
    if (!token) throw new Error("No token found");

    // const response = await API.get("/auth/verify", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // return response.data; // user data

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token === "dummy-jwt-token") {
          resolve(
            {
          success: true,
          message: "JWT verified successfully",
          user: {
            id: 1,
            name: "Test User",
            email: "test@gmail.com",
          },
        },
            1000
          );
        } else {
          reject(new Error("Invalid or expired token"));
        }
      });
    });
  } catch (error) {
      console.error("Token verification failed:", error);
    throw new Error("Token verification failed: " + error.message);         
   
  }
};
