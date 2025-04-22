import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function App() {
  return (
    <div>
      <div className="top">
        <div className="heading">Store Locator</div>
      </div>
      <MapContainer center={[33.7141061, 73.0657246]} zoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[33.7141061, 73.0657246]}>
          <Popup>Blue Area, Islamabad</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
