import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapCenter from "./MapCenter";
import { useGeolocation } from "../hooks/useGeolocation";
import type { SelectedLocation } from "../pages/home/Home";

type Props = {
  selectedLocation: SelectedLocation;
};

const Map = ({ selectedLocation }: Props) => {
  const { coordinates, loading } = useGeolocation();
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
            <Popup>{selectedLocation.name}</Popup>
          </Marker>
        )}
      </MapContainer>
    </section>
  );
};

export default Map;
