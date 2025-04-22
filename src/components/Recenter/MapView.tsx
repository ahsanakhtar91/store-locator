import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const Recenter = ({ position }: { position: L.LatLngExpression }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return null;
};
