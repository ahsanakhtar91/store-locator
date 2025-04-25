import { Store } from "../../data/types";
import { Icon } from "leaflet";
import { Marker, Popup, Tooltip } from "react-leaflet";

export const StoreMarker = ({
  store,
  icon,
  selectedProduct,
}: {
  store: Store;
  icon: Icon;
  selectedProduct: string;
}) => {
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
        <div style={{ marginTop: 10 }}>
          <strong>Available products:</strong>
          <div>
            {store.products?.map((p, i) => (
              <li key={i}>
                {p === selectedProduct ? <mark>{p}</mark> : <span>{p}</span>}
              </li>
            ))}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
