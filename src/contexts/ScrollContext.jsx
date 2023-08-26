import { createContext, useState } from "react";
import Cookies from "js-cookie";
export const isDarkContext = createContext({});

export const ScrollProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(!!Cookies.get("dark"));

  return (
    <ScrollContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ScrollContext.Provider>
  );
};
