import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  coordinates: [number, number];
};

const MapCenter = ({ coordinates }: Props) => {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.setView(coordinates, map.getZoom());
    }, 50);

    return () => clearTimeout(timer);
  }, [coordinates, map]);

  return null;
};

export default MapCenter;
