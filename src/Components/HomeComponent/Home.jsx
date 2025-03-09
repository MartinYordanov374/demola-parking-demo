import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Map from '../MapComponent/Map'
import Navigation from '../NavigationBar/Navigation'

export default function Home() {
  return (
    <div>
      <SearchBar/>
      <Map/>
      <Navigation/>
    </div>
  )
}
