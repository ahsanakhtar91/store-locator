import { Icon } from "leaflet";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png"

export const getStoreMarkerIcon = (color: "green" | "yellow" | "red") => {
  const url = `https://maps.gstatic.com/mapfiles/ms2/micons/${color}-dot.png`;
  return new Icon({
    iconUrl: url,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    shadowUrl: markerShadowUrl,
    shadowSize: [32, 32],
    shadowAnchor: [10, 32],
    tooltipAnchor: [0, 2],
    popupAnchor: [0, -34],
  });
};
