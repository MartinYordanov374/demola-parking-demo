import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Map from '../MapComponent/Map'
import Navigation from '../NavigationBar/Navigation'
import {useMap } from "react-leaflet";

export default function Home() {
  let [mapPosition, setMapPosition] = useState([61.4466610123261, 23.852789195071736]);
  let [userPosition, setUserPosition] = useState([61.4466610123261, 23.852789195071736]);
  let [hasMapRecentered, setHasMapRecentered] = useState(false)
  let [destinationName, setDestinationName]= useState()
  let [route, setRoute] = useState('')
  const MapRecenter= ({ position }) => {
    const map = useMap();
    map.flyTo(position);
  };


  return (
    <div>
      <SearchBar 
        mapPosition = {mapPosition} 
        setMapPosition={setMapPosition} 
        setHasMapRecentered={setHasMapRecentered}
        setDestinationName={setDestinationName}
        MapRecenter={MapRecenter}
        userPosition={userPosition}
        setRoute={setRoute}
      />
      <Map 
        mapPosition = {mapPosition} 
        setMapPosition={setMapPosition} 
        hasMapRecentered={hasMapRecentered}
        destinationName={destinationName}
        MapRecenter={MapRecenter}
        userPosition={userPosition}
        setUserPosition={setUserPosition}
        route={route}
      />
      <Navigation/>
    </div>
  )
}
