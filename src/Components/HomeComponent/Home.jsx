import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Map from '../MapComponent/Map'
import Navigation from '../NavigationBar/Navigation'

export default function Home() {
  let [mapPosition, setMapPosition] = useState([61.4466610123261, 23.852789195071736]);
  let [hasMapRecentered, setHasMapRecentered] = useState(false)

  return (
    <div>
      <SearchBar mapPosition = {mapPosition} setMapPosition={setMapPosition} setHasMapRecentered={setHasMapRecentered}/>
      <Map mapPosition = {mapPosition} setMapPosition={setMapPosition} hasMapRecentered={hasMapRecentered}/>
      <Navigation/>
    </div>
  )
}
