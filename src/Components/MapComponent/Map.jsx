import React, {useEffect, useState} from 'react'
import '../../Styles/Map/MapStyles.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'
import LocationIcon from '../../Icons/dot.svg'
import DestinationIcon from '../../Icons/geo-fill.svg'
const LocationMarker = new Icon({
 iconUrl: LocationIcon,
 iconSize: [64,64]
})

const DestinationMarker = new Icon({
  iconUrl: DestinationIcon,
  iconSize: [32,32]
 })

const MapRecenter= ({ position }) => {
  const map = useMap();
  map.flyTo(position);
};

export default function Map({mapPosition, setMapPosition, hasMapRecentered}) {
  
  let [userPosition, setUserPosition] = useState([61.4466610123261, 23.852789195071736]);
  useEffect(() => {
    navigator.geolocation.watchPosition(
      (success) => {
        setUserPosition([success.coords.latitude, success.coords.longitude]);
        console.log(success);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true}
    );
    
  });
  
  return (
    <div className='MapWrapper'>
      <div className='MapContainer container'>
        <MapContainer className='LeafletContainer' center={mapPosition} zoom={16} style={{ height: '100%', width: '100%' }}>
          <MapRecenter position={mapPosition} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"> </TileLayer>
          <Marker position={userPosition} icon={LocationMarker}>
            <Popup>Your current location</Popup>
          </Marker>
          {hasMapRecentered &&
            <Marker position={mapPosition} icon={DestinationMarker}>
              <Popup>Your target location</Popup>
            </Marker>
          }
        </MapContainer>
      </div>
    </div>
  )
}
