import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Create one central axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Base URL for the entire API
  withCredentials: true, // This is crucial for sending cookies
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To check auth status on page load

  useEffect(() => {
    // This function checks if a user is already logged in (e.g., from a previous session)
    const checkAuthStatus = async () => {
      try {
        // The browser automatically sends the cookie
        const res = await api.get("/users/current-user");
        if (res.data.success) {
          setUser(res.data.data);
        }
      } catch (error) {
        // No user is logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const signup = async (formData) => {
    try {
      const res = await api.post("/users/signup", formData);
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

  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/users/login", { email, password });
      if (res.data.success) {
        setUser(res.data.data.user); // Set the user state with the returned user object
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

  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null); // Clear the user from state
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    api, // Expose the api instance if needed in other components
  };

  // We show a loading screen or nothing until the initial auth check is complete
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);