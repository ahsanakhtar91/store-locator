import { Icon } from "leaflet";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

// "yellow": icon/marker for the store where product IS available
// "green": icon/marker for the NEAREST store where product IS available
// "red": icon/marker for the store where product is NOT available

export const getStoreMarkerIcon = (color: "yellow" | "green" | "red") => {
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
