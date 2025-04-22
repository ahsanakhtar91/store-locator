import "./App.css";
import { MapView } from "./components/MapView/MapView";

export default function App() {
  return (
    <div>
      <div className="top">
        <div className="heading">Store Locator</div>
      </div>
      <MapView />
    </div>
  );
}
