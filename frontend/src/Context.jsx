import { createContext, useContext, useState } from "react";

// Step 1️⃣ Create Context
const AppContext = createContext();

// Step 2️⃣ Create Provider Component
export const AppProvider = ({ children }) => {
  // Global state here
    // const SOCKET_URL = 'https://codeshare-backend-w06x.onrender.com';
    // const API_URL = 'https://codeshare-backend-w06x.onrender.com';
    const SOCKET_URL='http://localhost:5000'
    const API_URL = SOCKET_URL;
    const [verified, setVerified] = useState(false);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const value = {
    SOCKET_URL,
    API_URL,
    verified,
    setVerified,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Step 3️⃣ Create Custom Hook for consuming context
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
};
