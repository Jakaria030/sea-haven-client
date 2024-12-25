import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const HotelMap = () => {
  const hotelPosition = [23.012325109575148, 89.83454076076065];

  return (
    <div className="h-[400px] w-full m-auto rounded-md border-2 border-white">
      <MapContainer
        center={hotelPosition}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
 
        <Marker position={hotelPosition}>
          <Popup>
            <strong>Sea Haven Hotel</strong>
            <br />
            Near the sea, the perfect getaway!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default HotelMap;
