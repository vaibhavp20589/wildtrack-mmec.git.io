// src/components/MapComponent.js
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { ThemeContext } from '../App';
import * as L from 'leaflet';
import yourIconImage from '../icon.png'; 
const MapComponent = ({ locations }) => {
  //const theme = useContext(ThemeContext);
  const customIcon = L.icon({
    iconUrl: yourIconImage,
    iconSize: [32, 48], // Adjust size as needed
    iconAnchor: [16, 37], // Optional: Anchor point for icon placement
});

  return (
    <div className="map-container">
      <h2>Map Component</h2>
      <MapContainer center={[27.159269, 77.5231999]} zoom={7} style={{ height: '300px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((location, index) => ( <Marker key={index} position={[location.latitude, location.longitude]} icon={customIcon}> <Popup>.{location.name}</Popup> </Marker> ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
