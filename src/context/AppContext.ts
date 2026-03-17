import { createContext, useContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type AppContextType = {};

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
