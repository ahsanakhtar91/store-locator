import "./App.css";
import { useState } from "react";
import { MapView } from "./components/MapView/MapView";
import { useStores } from "./data/useStores";
import { Select } from "antd";

export default function App() {
  const stores = useStores();

  const allUniqueProducts = Array.from(
    new Set(stores.flatMap((s) => s.products))
  );

  const [selectedProduct, setSelectedProduct] = useState();

  return (
    <div className="root">
      <div className="header">
        <div className="app-name">Store Locator</div>
        <div className="products-dropdown">
          <span className="label">Select a product</span>
          <Select
            allowClear
            options={allUniqueProducts.map((p) => ({ value: p, label: p }))}
            placeholder="Choose any"
            onChange={setSelectedProduct}
          />
        </div>
      </div>
      <MapView stores={stores} selectedProduct={selectedProduct} />
    </div>
  );
}
