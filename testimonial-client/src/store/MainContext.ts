import { createContext } from "react";

export type MainContextType = {
  userData: {};
  setUserData: (user: any) => void;
};

const MainContext = createContext<MainContextType | undefined>(undefined);

export default MainContext;

// const MainContextProvider = ({ children }: { children: ReactNode }) => {
// return <MainContext.Provider>{children}</MainContext.Provider>;
// };
