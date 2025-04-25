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
import { Store } from "../../data/types";

const currentLocationIcon = new Icon({
  iconUrl: pinLocationIcon,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  tooltipAnchor: [0, 12],
  popupAnchor: [0, -12],
});

const regionPakistan = { lat: 31.5, lng: 72.8 };

export const MapView = ({
  stores,
  selectedProduct,
}: {
  stores: Store[];
  selectedProduct?: string;
}) => {
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationPosition | null>(null);

  const [locationError, setLocationError] = useState<string | null>(null);

  const currentLocationCoords: LatLngTuple | null = useMemo(
    () =>
      currentLocation
        ? [
            currentLocation?.coords.latitude || 0,
            currentLocation?.coords.longitude || 0,
          ]
        : null,
    [currentLocation]
  );

  const currentLocationAccuracy = useMemo(
    () => currentLocation?.coords.accuracy || 100,
    [currentLocation?.coords.accuracy]
  );

  const findCurrentLocation = useCallback(() => {
    const geolocation = navigator.geolocation;
    if (!geolocation) {
      setCurrentLocation(null);
      setLocationError("Geolocation error: Geolocation is not supported!");
      return;
    }
    geolocation.getCurrentPosition(
      (p) => setCurrentLocation(p),
      (e) => {
        setCurrentLocation(null);
        setLocationError(`Geolocation error: ${e.message}`);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => findCurrentLocation(), [findCurrentLocation]);

  return (
    <>
      {locationError && <div className="error">{locationError}</div>}
      <MapContainer
        center={currentLocationCoords ?? regionPakistan}
        zoom={currentLocationCoords ? 15 : 6}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* A Button for centering the map to the current location */}
        <Button
          className="absolute icon-button top-right"
          onClick={findCurrentLocation}
          disabled={!currentLocation}
        >
          <FontAwesomeIcon
            icon={faLocation}
            style={{ width: 20, height: 20 }}
          />
        </Button>

        {currentLocationCoords && (
          <>
            {/* Rendering the Marker to represent the current location on the map */}
            <Marker position={currentLocationCoords} icon={currentLocationIcon}>
              <Tooltip direction="bottom">Your Location</Tooltip>
              <Popup>
                <strong>Your Location</strong>
                <br />
                Accuracy: {currentLocationAccuracy?.toFixed(1)} meters
              </Popup>
            </Marker>

            {/* Recenters the map on the provided location */}
            <Recenter position={currentLocationCoords} />
            {/* Showing a Circle around the current location to represent how accurate it is */}
            <Circle
              center={currentLocationCoords}
              radius={currentLocation?.coords.accuracy || 100}
              pathOptions={{ weight: 0 }}
            />
          </>
        )}

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
    </>
  );
};
