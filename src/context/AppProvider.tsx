import { useState } from "react";
import type { Waypoint } from "../types/types";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

  return (
    <AppContext.Provider value={{ waypoints, setWaypoints }}>
      {children}
    </AppContext.Provider>
  );
};
