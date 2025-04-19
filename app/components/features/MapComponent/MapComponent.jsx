'use client';
import './MapComponent.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapComponent() {
  return (
    <div className="map-wrapper">
      <MapContainer center={[51.505, -0.09]} zoom={13} className="map">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            Dashboard Marker<br /> London
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
