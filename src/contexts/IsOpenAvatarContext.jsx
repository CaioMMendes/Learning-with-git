import { createContext, useState } from "react";
export const IsOpenAvatarContext = createContext({});

export const IsOpenAvatarProvider = ({ children }) => {
  const [isOpenAvatar, setIsOpenAvatar] = useState("false");

  return (
    <IsOpenAvatarContext.Provider value={{ isOpenAvatar, setIsOpenAvatar }}>
      {children}
    </IsOpenAvatarContext.Provider>
  );
};
