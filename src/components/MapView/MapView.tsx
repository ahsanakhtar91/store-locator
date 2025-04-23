import "./MapView.css";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LatLngTuple, Icon } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Tooltip,
} from "react-leaflet";
import { Recenter } from "../Recenter/Recenter";
import pinLocationIcon from "../../icons/pinLocation.svg";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { getStoreMarkerIcon } from "../../utils/utils";
import { Store } from "../../types/types";

const currentLocationIcon = new Icon({
  iconUrl: pinLocationIcon,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  tooltipAnchor: [0, 12],
  popupAnchor: [0, -12],
});

export const MapView = ({ stores }: { stores: Store[] }) => {
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationPosition | null>(null);

  const currentLocationLatLng: LatLngTuple = [
    currentLocation?.coords.latitude || 0,
    currentLocation?.coords.longitude || 0,
  ];

  const currentLocationAccuracy = useMemo(
    () => currentLocation?.coords.accuracy || 100,
    [currentLocation?.coords.accuracy]
  );

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

      {/* A Button for centering the map to the current location */}
      <Button
        className="absolute icon-button top-right"
        onClick={findCurrentLocation}
      >
        <FontAwesomeIcon icon={faLocation} style={{ width: 20, height: 20 }} />
      </Button>

      {/* Rendering the Marker to represent the current location on the map */}
      <Marker position={currentLocationLatLng} icon={currentLocationIcon}>
        <Tooltip direction="bottom">Your Location</Tooltip>
        <Popup>
          <strong>Your Location</strong>
          <br />
          Accuracy: {currentLocationAccuracy?.toFixed(1)} meters
        </Popup>
      </Marker>
      {/* Recenters the map on current location */}
      <Recenter position={currentLocationLatLng} />
      {/* Showing a Circle around the current location to represent how accurate it is */}
      <Circle
        center={currentLocationLatLng}
        radius={currentLocation?.coords.accuracy || 100}
        pathOptions={{ weight: 0 }}
      />

      {/* Rendering the Store Markers to represent the actual store locations on the map */}
      {stores.map((store) => {
        const icon = getStoreMarkerIcon("red");
        return (
          <Marker
            key={store.id}
            position={[store.latitude, store.longitude]}
            icon={icon}
          >
            <Tooltip direction="bottom">{store.address}</Tooltip>
            <Popup>
              <strong>{store.name}</strong>
              <br />
              {store.address}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
