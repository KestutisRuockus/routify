import { useState } from "react";
import Map from "../../components/Map";
import { useAppContext } from "../../context/AppContext";
import "./planner.css";
import type { Waypoint } from "../../types/types";
import { reverseGeocode } from "../../utils/geocoding";
import SearchInput from "../../components/SearchInput";

const Planner = () => {
  const { waypoints, setWaypoints } = useAppContext();
  const [markedWaypoint, setMarkedWaypoint] = useState<Waypoint | null>(
    waypoints[0] ?? null,
  );
  const [selectedLocation, setSelectedLocation] = useState<Waypoint | null>(
    null,
  );

  const handleDelete = (id: number) => {
    setWaypoints(waypoints.filter((w) => w.id !== id));
    if (markedWaypoint?.id === id) {
      setMarkedWaypoint(null);
    }
    if (selectedLocation?.id === id) {
      setSelectedLocation(null);
    }
  };

  const handleMapClick = async (coords: [number, number]) => {
    const location = await reverseGeocode(coords);
    setSelectedLocation(location);
  };

  const handleSelect = (waypoint: Waypoint) => {
    setSelectedLocation(waypoint);
  };

  return (
    <main className="planner-main">
      <Map
        selectedLocation={selectedLocation}
        isPlannerPage={true}
        markedWaypoint={markedWaypoint ?? undefined}
        onMapClick={handleMapClick}
        setSelectedLocation={setSelectedLocation}
        setMarkedWaypoint={setMarkedWaypoint}
      />
      <aside className="planner-panel">
        <h1 className="planner-title">Route Planner</h1>
        <SearchInput onSelect={handleSelect} />
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
