import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
  return (
    <section aria-label="Interactive map" className="map-section">
      <MapContainer
        center={[54.8985, 23.9036]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </section>
  );
};

export default Map;
