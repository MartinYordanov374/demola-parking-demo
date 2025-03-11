import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Map from '../MapComponent/Map'
import Navigation from '../NavigationBar/Navigation'

export default function Home() {
  let [mapPosition, setMapPosition] = useState([61.4466610123261, 23.852789195071736]);
  let [hasMapRecentered, setHasMapRecentered] = useState(false)
  let [destinationName, setDestinationName]= useState()

  return (
    <div>
      <SearchBar 
        mapPosition = {mapPosition} 
        setMapPosition={setMapPosition} 
        setHasMapRecentered={setHasMapRecentered}
        setDestinationName={setDestinationName}
      />
      <Map 
        mapPosition = {mapPosition} 
        setMapPosition={setMapPosition} 
        hasMapRecentered={hasMapRecentered}
        destinationName={destinationName}
      />
      <Navigation/>
    </div>
  )
}
