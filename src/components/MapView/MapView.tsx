import "./MapView.css";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useState } from "react";
import { LatLngTuple, Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { Recenter } from "../Recenter/Recenter";
import markerIconPng from "../../icons/pinLocation.svg";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";

const currentLocationIcon = new Icon({
  iconUrl: markerIconPng,
  popupAnchor: [0, -12],
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export const MapView = () => {
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationPosition | null>(null);

  const currentLocationLatLng: LatLngTuple = [
    currentLocation?.coords.latitude || 0,
    currentLocation?.coords.longitude || 0,
  ];

  const [error, setError] = useState<string | null>(null);

  const findCurrentLocation = useCallback(() => {
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

  useEffect(() => findCurrentLocation(), [findCurrentLocation]);

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
      <Marker position={currentLocationLatLng} icon={currentLocationIcon}>
        <Popup>Your Location</Popup>
      </Marker>
      {/* Showing a Circle around the current location to represent how accurate it is */}
      <Circle
        center={currentLocationLatLng}
        radius={currentLocation?.coords.accuracy || 100}
        pathOptions={{ weight: 0 }}
      />
      {/* A Button for centering the map to the current location */}
      <Button
        className="absolute icon-button top-right"
        onClick={findCurrentLocation}
      >
        <FontAwesomeIcon icon={faLocation} style={{ width: 20, height: 20 }} />
      </Button>
    </MapContainer>
  );
};
