import "./App.css";
import { MapView } from "./components/MapView/MapView";
import { useStores } from "./data/useStores";

export default function App() {
  const stores = useStores();
  return (
    <div className="root">
      <div className="header">
        <div className="app-name">Store Locator</div>
      </div>
      <MapView stores={stores} />
    </div>
  );
}
