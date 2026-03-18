import { useState } from "react";
import Map from "../../components/Map";
import { useAppContext } from "../../context/AppContext";
import "./planner.css";
import type { Waypoint } from "../../types/types";

const Planner = () => {
  const { waypoints, setWaypoints } = useAppContext();
  const [markedWaypoint, setMarkedWaypoint] = useState<Waypoint | null>(
    waypoints[0] ?? null,
  );

  const handleDelete = (id: number) => {
    setWaypoints(waypoints.filter((w) => w.id !== id));
    if (markedWaypoint?.id === id) {
      setMarkedWaypoint(null);
    }
  };

  return (
    <main className="planner-main">
      <Map
        selectedLocation={null}
        isPlannerPage={true}
        markedWaypoint={markedWaypoint ?? undefined}
      />
      <aside className="planner-panel">
        <h1 className="planner-title">Route Planner</h1>
        {waypoints.length === 0 ? (
          <p className="no-locations">No locations added yet</p>
        ) : (
          <ul className="planner-list">
            {waypoints.map((waypoint) => (
              <li
                key={waypoint.id}
                onClick={() =>
                  setMarkedWaypoint(
                    markedWaypoint?.id !== waypoint.id ? waypoint : null,
                  )
                }
                className={`planner-list-item ${waypoint.id === markedWaypoint?.id ? "planner-list-item-active" : ""}`}
              >
                {waypoint.name}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(waypoint.id);
                  }}
                  className={`planner-list-delete-item ${waypoint.id === markedWaypoint?.id ? "planner-list-delete-item-active" : ""}`}
                >
                  X
                </span>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </main>
  );
};

export default Planner;
