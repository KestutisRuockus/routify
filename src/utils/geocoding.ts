import type { Waypoint } from "../types/types";

export const reverseGeocode = async (
  coords: [number, number],
): Promise<Waypoint> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json`,
  );
  const data = await response.json();
  return {
    id: data.place_id,
    coordinates: [data.lat, data.lon],
    name: data.display_name,
  };
};
