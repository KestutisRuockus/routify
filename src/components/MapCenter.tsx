import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  coordinates: [number, number];
};

const MapCenter = ({ coordinates }: Props) => {
  const map = useMap();

  useEffect(() => {
    map.setView(coordinates, 13);
  }, [coordinates, map]);

  return null;
};

export default MapCenter;
