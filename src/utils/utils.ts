import { Icon, LatLng, LatLngTuple } from "leaflet";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

export const getCurrentLocation = (
  onSuccess: (position: GeolocationPosition) => void,
  onError: (message: string) => void
) => {
  const geolocation = navigator.geolocation;
  if (!geolocation) {
    onError("Geolocation error: Geolocation is not supported!");
    return;
  }
  geolocation.getCurrentPosition(
    (postion) => onSuccess(postion),
    (e) => onError(`Geolocation error: ${e.message}`),
    { enableHighAccuracy: true }
  );
};

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

// havesine function, takes 2 pairs of locations (Lat/Lng) as params and calulates the distance between them in kilometers
export const haversine = (location1: LatLngTuple, location2: LatLngTuple) => {
  if (!location1 || !location2) return 0;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371; // Earth's Radius (in kilometers)
  const dLat = toRad(location2[0] - location1[0]);
  const dLng = toRad(location2[1] - location1[1]);
  const lat1 = toRad(location1[0]);
  const lat2 = toRad(location2[0]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
