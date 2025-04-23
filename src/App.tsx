import "./App.css";
import { MapView } from "./components/MapView/MapView";
import { useStores } from "./data/useStores";

export default function App() {
  const stores = useStores();
  return (
    <div>
      <div className="top">
        <div className="heading">Store Locator</div>
      </div>
      <MapView stores={stores} />
    </div>
  );
}
