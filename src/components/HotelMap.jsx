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
  const hotelPosition = [21.818191132527446, 90.13951064263217];

  return (
    <div className="h-[400px] w-full m-auto rounded-md border-2 border-white z-0">
      <MapContainer
        center={hotelPosition}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex:0}}
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
