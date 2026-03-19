import "leaflet/dist/leaflet.css";
import "./map.css";
import type { Waypoint } from "../types/types";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import MapCenter from "./MapCenter";
import { useGeolocation } from "../hooks/useGeolocation";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import L from "leaflet";

type Props = {
  selectedLocation: Waypoint | null;
  isPlannerPage?: boolean;
  markedWaypoint?: Waypoint;
  onMapClick?: (coords: [number, number]) => void;
};

const createPinIcon = (color: string) =>
  L.divIcon({
    className: "",
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}"/>
      <circle cx="12" cy="12" r="5" fill="white"/>
    </svg>`,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });

const defaultPin = createPinIcon("#3b82f6");
const activePin = createPinIcon("#16a34a");

const MapClickHandler = ({
  onMapClick,
}: {
  onMapClick: (coords: [number, number]) => void;
}) => {
  useMapEvents({
    click(e) {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const Map = ({
  selectedLocation,
  isPlannerPage = false,
  markedWaypoint,
  onMapClick,
}: Props) => {
  const { coordinates, loading } = useGeolocation();
  const { waypoints, setWaypoints } = useAppContext();
  const navigate = useNavigate();

  const handleAddToPlanner = () => {
    if (selectedLocation) {
      setWaypoints([...waypoints, selectedLocation]);
      navigate("/planner");
    }
  };

  return (
    <section aria-label="Interactive map" className="map-section">
      <MapContainer
        center={
          isPlannerPage && markedWaypoint
            ? markedWaypoint.coordinates
            : [55.1694, 23.8813]
        }
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        {!loading && !isPlannerPage && (
          <MapCenter
            coordinates={selectedLocation?.coordinates ?? coordinates}
          />
        )}
        {isPlannerPage && markedWaypoint && (
          <MapCenter coordinates={markedWaypoint.coordinates} />
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
        {isPlannerPage &&
          waypoints.map((waypoint) => (
            <Marker
              key={waypoint.id}
              position={waypoint.coordinates}
              icon={waypoint.id === markedWaypoint?.id ? activePin : defaultPin}
            >
              <Popup>{waypoint.name}</Popup>
            </Marker>
          ))}
        {onMapClick && <MapClickHandler onMapClick={onMapClick} />}
      </MapContainer>
    </section>
  );
};

export default Map;
