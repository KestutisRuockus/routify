import "leaflet/dist/leaflet.css";
import "./map.css";
import type { Waypoint } from "../types/types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapCenter from "./MapCenter";
import { useGeolocation } from "../hooks/useGeolocation";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

type Props = {
  selectedLocation: Waypoint | null;
};

const Map = ({ selectedLocation }: Props) => {
  const { coordinates, loading } = useGeolocation();

  const { waypoints, setWaypoints } = useAppContext();
  const navigate = useNavigate();
  console.log(waypoints);

  const handleAddToPlanner = () => {
    if (selectedLocation) {
      setWaypoints([...waypoints, selectedLocation]);
      navigate("/planner");
    }
  };

  return (
    <section aria-label="Interactive map" className="map-section">
      <MapContainer
        center={[55.1694, 23.8813]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        {!loading && (
          <MapCenter
            coordinates={selectedLocation?.coordinates ?? coordinates}
          />
        )}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedLocation && (
          <Marker position={selectedLocation.coordinates}>
            <Popup>
              {selectedLocation.name}
              <button type="button" onClick={handleAddToPlanner}>
                Add to Planner
              </button>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </section>
  );
};

export default Map;
