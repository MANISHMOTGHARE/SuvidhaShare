import { createContext, useContext, useState } from "react";

// Auth context
const AuthContext = createContext();

//Provider context
export const AuthProvider = ({ children }) => {
  //storing role and username from localstorage
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");
  const [userName, setUserName] = useState(
    localStorage.getItem("username") || ""
  );

  return (
    <AuthContext.Provider
      value={{ userRole, setUserRole, userName, setUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook to use AuthContext easily
export const useAuth = () => useContext(AuthContext);
