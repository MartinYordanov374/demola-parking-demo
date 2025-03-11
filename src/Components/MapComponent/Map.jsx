import React, {useEffect, useState} from 'react'
import '../../Styles/Map/MapStyles.css'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'
import LocationIcon from '../../Icons/dot.svg'
const LocationMarker = new Icon({
 iconUrl: LocationIcon,
 iconSize: [64,64]
})

export default function Map() {
  
  let [position, setPosition] = useState([61.4466610123261, 23.852789195071736]);

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (success) => {
        setPosition([success.coords.latitude, success.coords.longitude]);
        console.log(success);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true}
    );
  });
  
  return (
    <div className='MapWrapper'>
      <div className='MapContainer container'>
        <MapContainer className='LeafletContainer' center={position} zoom={20} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"> </TileLayer>
          <Marker position={position} icon={LocationMarker}>
            <Popup>Your current location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}
