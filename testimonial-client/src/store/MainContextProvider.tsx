"use client";
import { ReactNode, useState } from "react";
import MainContext from "./MainContext";

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState({});
  console.log(userData);
  return (
    <MainContext.Provider value={{ userData, setUserData }}>
      {children}
    </MainContext.Provider>
  );
};
