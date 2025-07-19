// src/api/auth.js
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

export const getUserChats = async () => {
  try {
    const response = await API.get("/user/chats/");

    
    if (response.data) {
      return {
        success: true,
        message: "Chats Fetched Successfully",
        chats: response.data,
      };
    }
    else
    {
      return {
        success:false,
        message:"Chats fetch failed"
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

export const getChatById = async (id) => {
  try {
    const response = await API.get(`/user/chats/${id}/`);

    // console.log("Response from getChatById:", response);
    if (response.data) {
      return {
        success: true,
        message: `Chat ${id} Fetched Successfully`,
        chats: response.data.chats,
        session_id: response.data.session_id,
        session_title: response.data.session_title
      };
    }
    else
    {
      return {
        success:false,
        message:"Chats fetch failed"
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


export const getChatResponse = async (id, message) => {
  try {

      const formData = new URLSearchParams();
      formData.append("text", message);
console.log('url',`/user/chats/${id}/text`)
    const response = await API.post(`/user/chats/${id}/text/`,formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

   console.log('Response from getChatResponse:', response);
    

    
    if (response.data.chat) {
      return {
        success: true,
        message: `Response Recieved Successfully`,
        response: response.data.chat.Assistant,
        session_id: response.data.session_id,
        session_title: response.data.session_title
      };
    }
    else
    {
      return {
        success:false,
        message:"Response Generation failed"
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

export const DeleteChatById = async (id) => {
  try {
    const response = await API.delete(`/user/chats/${id}/del/`);

    // console.log("Response from DeleteChatById:", response);
    if (response.status==204) {
      return {
        success: true,
        message: `Chat ${id} Deleted Successfully`,
        
      };
    }
    else
    {
      return {
        success:false,
        message:`Chat ${id} deletion failed`
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

export const RenameChatById = async (id,rename) => {
  try {
    const response = await API.put(`/user/chats/${id}/rename/${rename}/`);

    console.log("Response from RenameChatById:", response);
    if (response.data) {
      return {
        success: true,
        message: `Chat ${id} renamed Successfully`,
        
      };
    }
    else
    {
      return {
        success:false,
        message:`Chat ${id} rename failed`
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

export const DeleteAllChats = async () => {
  try {
    const response = await API.delete(`/user/chats/del/`);
    console.log("Response from DeleteAllChats:", response);
    if (response.status==204) {
      return {
        success: true,
        message: `Chats deleted Successfully`,
        
      };
    }
    else
    {
      return {
        success:false,
        message:`Chats deletion failed`
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

