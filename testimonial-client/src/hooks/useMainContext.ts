import MainContext, { MainContextType } from "@/store/MainContext";
import { useContext } from "react";

export const useMainContext = (): MainContextType => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return context;
};
