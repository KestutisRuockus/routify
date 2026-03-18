import type { Waypoint } from "../types/types";
import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type AppContextType = {
  waypoints: Waypoint[];
  setWaypoints: Dispatch<SetStateAction<Waypoint[]>>;
};

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
