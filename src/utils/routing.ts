import type { RouteResult } from "../types/types";

export const getRoute = async (
  from: [number, number],
  to: [number, number],
): Promise<RouteResult> => {
  const response = await fetch(
    "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: import.meta.env.VITE_ORS_API_KEY,
      },
      body: JSON.stringify({
        coordinates: [
          [from[1], from[0]],
          [to[1], to[0]],
        ],
      }),
    },
  );
  const data = await response.json();

  const feature = data.features[0];
  const coords = feature.geometry.coordinates.map(
    ([lon, lat]: [number, number]) => [lat, lon] as [number, number],
  );
  const { distance, duration } = feature.properties.summary;

  return { coords, distance, duration };
};
