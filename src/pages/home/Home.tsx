import type { Waypoint } from "../../types/types";
import { useState } from "react";
import Map from "../../components/Map";
import SearchInput from "../../components/SearchInput";
import "./home.css";
import { reverseGeocode } from "../../utils/geocoding";

export const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState<Waypoint | null>(
    null,
  );

  const handleMapClick = async (coords: [number, number]) => {
    const location = await reverseGeocode(coords);
    setSelectedLocation(location);
  };

  return (
    <main className="home-main">
      <h1 className="home-title">Find your destination</h1>
      <SearchInput setSelectedLocation={setSelectedLocation} />
      <div className="home-map">
        <Map selectedLocation={selectedLocation} onMapClick={handleMapClick} />
      </div>
    </main>
  );
};
