import type { RouteResult, Waypoint } from "../../types/types";
import { useState } from "react";
import Map from "../../components/Map";
import SearchInput from "../../components/SearchInput";
import "./home.css";
import { reverseGeocode } from "../../utils/geocoding";
import { useGeolocation } from "../../hooks/useGeolocation";
import { getRoute } from "../../utils/routing";

export const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState<Waypoint | null>(
    null,
  );
  const [route, setRoute] = useState<RouteResult | null>(null);
  const { coordinates } = useGeolocation();

  const handleGetRoute = async () => {
    if (!selectedLocation) {
      return;
    }

    const route = await getRoute(coordinates, selectedLocation.coordinates);
    setRoute(route);
    console.log(route);
  };

  const handleClearMap = () => {
    setSelectedLocation(null);
    setRoute(null);
  };

  const handleMapClick = async (coords: [number, number]) => {
    setRoute(null);
    const location = await reverseGeocode(coords);
    setSelectedLocation(location);
  };

  const convertDistance = (distance: number) => {
    if (distance < 1000) return `${Math.round(distance)} m`;
    return `${(distance / 1000).toFixed(1)} km`;
  };

  const convertDuration = (duration: number) => {
    const minutes = Math.round(duration / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  return (
    <main className="home-main">
      <h1 className="home-title">Find your destination</h1>
      <SearchInput
        setSelectedLocation={setSelectedLocation}
        selectedLocationName={selectedLocation?.name}
      />
      {selectedLocation && (
        <div className="home-route-details">
          {route && (
            <>
              <p>Distance: {convertDistance(route.distance)}</p>
              <p>Time: {convertDuration(route.duration)}</p>
              <button type="button" onClick={handleClearMap}>
                Clear map
              </button>
            </>
          )}
          {!route && (
            <button type="button" onClick={handleGetRoute}>
              Get Route
            </button>
          )}
        </div>
      )}
      <div className="home-map">
        <Map
          selectedLocation={selectedLocation}
          onMapClick={handleMapClick}
          routeCoords={route?.coords}
          userCoordinates={coordinates}
        />
      </div>
    </main>
  );
};
