import { useEffect, useState } from "react";

export const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState<[number, number]>([
    55.1694, 23.8813,
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates([coords.latitude, coords.longitude]);
        setLoading(false);
      },
      () => setLoading(false),
    );
  }, []);

  return { coordinates, loading };
};
