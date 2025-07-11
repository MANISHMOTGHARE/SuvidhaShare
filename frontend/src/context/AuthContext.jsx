import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");
  const [userName, setUserName] = useState(localStorage.getItem("username") || "");

  // Axios instance
  const api = axios.create({
    baseURL: "http://localhost:5000/api/v1/user", // ✅ Update if backend running elsewhere
    withCredentials: true, // ✅ Send cookies like access/refresh token
  });

  // Signup function
  const signup = async (formData) => {
    try {
      const res = await api.post("/signup", formData);
      return {
        success: true,
        message: res.data?.message || "Signup successful",
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Signup failed",
      };
    }
  };

  // Login function
  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/login", { email, password });

      const { user } = res.data?.data || {};
      if (user) {
        setUserRole(user.role);
        setUserName(user.username);
        localStorage.setItem("role", user.role);
        localStorage.setItem("username", user.username);
      }

      return {
        success: true,
        message: res.data?.message || "Login successful",
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ userRole, userName, setUserRole, setUserName, signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
