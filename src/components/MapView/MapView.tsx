import "./MapView.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { Recenter } from "../Recenter/MapView";

export const MapView = () => {
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationPosition | null>(null);

  const currentLocationLatLng: LatLngTuple = [
    currentLocation?.coords.latitude || 0,
    currentLocation?.coords.longitude || 0,
  ];

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const geolocation = navigator.geolocation;
    if (!geolocation) {
      setError("navigator.geolocation: Geolocation is not supported!");
      return;
    }
    geolocation.getCurrentPosition(
      (p) => setCurrentLocation(p),
      (e) => setError("navigator.geolocation: " + e.message),
      { enableHighAccuracy: true }
    );
  }, []);

  return error ? (
    <div className="error">{error}</div>
  ) : (
    <MapContainer center={currentLocationLatLng} zoom={15}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Recenters the map on current location */}
      <Recenter position={currentLocationLatLng} />
      {/* Rendering the Marker to represent the current location on the map */}
      <Marker position={currentLocationLatLng}>
        <Popup>Your location</Popup>
      </Marker>
      {/* Showing a Circle around the current location to represent how accurate it is */}
      <Circle
        center={currentLocationLatLng}
        radius={currentLocation?.coords.accuracy || 100}
        pathOptions={{ weight: 1 }}
      />
    </MapContainer>
  );
};
