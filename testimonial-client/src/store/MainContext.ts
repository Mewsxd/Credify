import { createContext } from "react";

type userDataType = {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  spaces: [];
};
export type MainContextType = {
  userData: userDataType;
  setUserData: (user: any) => void;
};

const MainContext = createContext<MainContextType | undefined>(undefined);

export default MainContext;

// const MainContextProvider = ({ children }: { children: ReactNode }) => {
// return <MainContext.Provider>{children}</MainContext.Provider>;
// };
