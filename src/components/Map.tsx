import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MapCenter from "./MapCenter";
import { useGeolocation } from "../hooks/useGeolocation";

const Map = () => {
  const { coordinates, loading } = useGeolocation();
  return (
    <section aria-label="Interactive map" className="map-section">
      <MapContainer
        center={[55.1694, 23.8813]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        {!loading && <MapCenter coordinates={coordinates} />}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </section>
  );
};

export default Map;
