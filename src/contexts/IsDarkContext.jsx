import { createContext, useState } from "react";
import Cookies from "js-cookie";
export const isDarkContext = createContext({});

export const IsDarkContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(!!Cookies.get("dark"));

  return (
    <isDarkContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </isDarkContext.Provider>
  );
};
