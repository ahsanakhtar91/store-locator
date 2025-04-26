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
import { getCurrentLocation, haversine } from "../../utils/utils";
import { Store, StoreWithDistance } from "../../data/types";
import { StoreMarker } from "../StoreMarker/StoreMarker";

const currentLocationIcon = new Icon({
  iconUrl: pinLocationIcon,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  tooltipAnchor: [0, 12],
  popupAnchor: [0, -12],
});

export const MapView = ({
  stores,
  selectedProduct,
}: {
  stores: Store[];
  selectedProduct?: string;
}) => {
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition>();
  const [locationError, setLocationError] = useState<string>();

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

  const moveToCurrentLocation = useCallback(() => {
    getCurrentLocation(
      (position) => {
        setCurrentLocation(position);
      },
      (error) => {
        setCurrentLocation(undefined);
        setLocationError(error);
      }
    );
  }, []);

  // Move to the user's current location when the component mounts for the first time
  useEffect(() => moveToCurrentLocation(), [moveToCurrentLocation]);

  const nearestStore: StoreWithDistance | null = useMemo(() => {
    if (!currentLocationCoords || !selectedProduct) return null;

    const storesHavingProduct = stores.filter((s) =>
      s.products?.includes(selectedProduct)
    );

    if (!storesHavingProduct.length) {
      return null;
    }

    const storesSortedByDistance = storesHavingProduct
      .map((s) => ({
        ...s,
        distance: parseFloat(
          haversine(currentLocationCoords, [s.latitude, s.longitude]).toFixed(1)
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    return storesSortedByDistance[0];
  }, [currentLocationCoords, selectedProduct, stores]);

  // When current location is not available, map centers on this default lat/lng with zoom=6, this shows the whole region of "Pakistan" on the map
  const pakistanCenterCoords = { lat: 31.5, lng: 72.8 };

  const initialMapCenter = currentLocationCoords ?? pakistanCenterCoords;
  const initialMapZoom = currentLocationCoords ? 15 : 6;

  return (
    <>
      {locationError && <div className="error">{locationError}</div>}
      {nearestStore && (
        <div className="nearest-store">
          Nearest Store Address: {nearestStore.address}
        </div>
      )}
      <MapContainer center={initialMapCenter} zoom={initialMapZoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* A Button for centering the map to the current location */}
        <Button
          className="absolute icon-button top-right"
          onClick={moveToCurrentLocation}
          disabled={!currentLocationCoords}
        >
          <FontAwesomeIcon
            icon={faLocation}
            style={{ width: 20, height: 20 }}
          />
        </Button>

        {currentLocationCoords && (
          <>
            {/* Rendering a Marker to represent the current location on the map with a custom blue cirlce svg icon (copied from https://www.openstreetmap.org) */}
            <Marker position={currentLocationCoords} icon={currentLocationIcon}>
              <Tooltip direction="bottom">Your Location</Tooltip>
              <Popup>
                <strong>Your Location</strong>
                <br />
                Accuracy: {currentLocationAccuracy?.toFixed(1)} meters
              </Popup>
            </Marker>
            {/* Recenters the map on the provided coordinates */}
            <Recenter position={currentLocationCoords} />
            {/* Showing a Circle around the current location to represent how accurate it is */}
            <Circle
              center={currentLocationCoords}
              radius={currentLocation?.coords.accuracy || 100}
              pathOptions={{ weight: 0 }}
            />
          </>
        )}

        {/* Rendering the Store Markers to represent the actual store locations on the map which offer the selected product (with different colors based on product availability / distance) */}
        {selectedProduct
          ? stores.map((store, i) => (
              <StoreMarker
                key={i}
                store={store}
                selectedProduct={selectedProduct}
                isStoreNearest={nearestStore?.id === store.id}
                distanceOfNearest={nearestStore?.distance ?? 0}
              />
            ))
          : undefined}
      </MapContainer>
    </>
  );
};
