import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WebMapComponent = () => {
  return (
    <MapContainer
      center={[43.6045, 1.444]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[43.6045, 1.444]}>
        <Popup>Toulouse, France</Popup>
      </Marker>
    </MapContainer>
  );
};

export default WebMapComponent;
