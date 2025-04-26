import "./StoreMarker.css";
import { Store } from "../../data/types";
import { getStoreMarkerIcon } from "../../utils/utils";
import { Marker, Popup, Tooltip, useMap } from "react-leaflet";
import { useEffect } from "react";

export const StoreMarker = ({
  store,
  selectedProduct,
  isStoreNearest,
  distanceOfNearest,
}: {
  store: Store;
  selectedProduct: string;
  isStoreNearest?: boolean;
  distanceOfNearest?: number;
}) => {
  const map = useMap();

  const storeHasProduct =
    selectedProduct && store.products?.includes(selectedProduct);

  const iconColor: Parameters<typeof getStoreMarkerIcon>[0] = isStoreNearest
    ? "green"
    : storeHasProduct
    ? "yellow"
    : "red";

  const icon = getStoreMarkerIcon(iconColor);

  useEffect(() => {
    if (isStoreNearest) {
      map.setView([store.latitude, store.longitude], 15, { animate: true });
    }
  }, [isStoreNearest, map, store]);

  return (
    <Marker
      key={store.id}
      position={[store.latitude, store.longitude]}
      icon={icon}
    >
      <Tooltip direction="bottom">{store.address}</Tooltip>
      <Popup>
        {isStoreNearest && (
          <div className="nearest-label">{`Nearest (Distance: ${distanceOfNearest} km)`}</div>
        )}
        <div className="section">
          <div>
            <strong>{store.name}</strong>
          </div>
          <span>{store.address}</span>
        </div>
        <div className="section">
          {store.products && store.products?.length > 0 ? (
            <>
              <strong>Available products:</strong>
              <div>
                {store.products?.map((p, i) => (
                  <li key={i}>
                    {p === selectedProduct ? (
                      // Highlights the selectedProduct inside the popup as well
                      <mark>{p}</mark>
                    ) : (
                      <span>{p}</span>
                    )}
                  </li>
                ))}
              </div>
            </>
          ) : (
            <i>No products available</i>
          )}
        </div>
      </Popup>
    </Marker>
  );
};
