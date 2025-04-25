import { useEffect } from "react";
import { LatLngTuple } from "leaflet";
import { useMap } from "react-leaflet";

export const Recenter = ({ position }: { position: LatLngTuple }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 15, { animate: true });
  }, [map, position]);

  return null;
};
