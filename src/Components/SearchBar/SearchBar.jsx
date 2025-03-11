import React, {useState} from 'react'
import '../../Styles/SearchBar/SearchBarStyles.css'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
import axios from 'axios'
import L from 'leaflet'

export default function SearchBar({mapPosition, setMapPosition, setHasMapRecentered, setDestinationName, userPosition, setRoute}) {
  let [address,setAddress] = useState('')
  let [startingLocation, setStartingLocation] = useState('')
  let [destination, setDestination] = useState('')

  let [startingLocationCoordinates, setStartingLocationCoordinates] = useState(0)
  let [destinationCoordinates, setDestinationCoordinates] = useState(0)

  const OSM_SEARCH_URL = `https://nominatim.openstreetmap.org/search.php?q=${address}&format=jsonv2`
  const OSM_SEARCH_STARTING_LOCATION_URL = `https://nominatim.openstreetmap.org/search.php?q=${startingLocation}&format=jsonv2`
  const OSM_SEARCH_DESTINATION_URL = `https://nominatim.openstreetmap.org/search.php?q=${destination}&format=jsonv2`

  const OSRM_SEARCH_URL = `http://router.project-osrm.org/route/v1/driving/${startingLocationCoordinates[1]},${startingLocationCoordinates[0]};${destinationCoordinates[1]},${destinationCoordinates[0]}`
  const searchLocation = async () => {
    let res = await axios.get(OSM_SEARCH_URL)
    .then((res) => 
    {
      let latitude = res.data[0].lat
      let longitude = res.data[0].lon
      let position = [latitude, longitude]
      setDestinationName(res.data[0].name)
      setMapPosition(position)
      setHasMapRecentered(true)
      
    })
    .catch((err) => 
    {
      alert(err)
    })
  }

  const centerOnUser = async () => {
   
      setMapPosition(userPosition)
      setHasMapRecentered(true)
  }

  const setStartingUserLocation = () => {
      setStartingLocation(userPosition)
  }

  const handleRoutesMenuVisibility = () => {
    let targetElement = document.querySelector('.RoutesWrapper')
    if(targetElement.style.display == 'none')
    {
      targetElement.style.display = 'block'
    }
    else
    {
      targetElement.style.display = 'none'
    }
  }

  const getRouteCoordinates = async () => {
    await axios.get(OSM_SEARCH_STARTING_LOCATION_URL)
    .then((res) => 
    {
      let latitude = res.data[0].lat
      let longitude = res.data[0].lon
      let position = [latitude, longitude]
      setStartingLocationCoordinates(position)
    })
    .catch((err) => 
    {
      alert(err)
    })
    
    await axios.get(OSM_SEARCH_DESTINATION_URL)
    .then((res) => 
      {
        let latitude = res.data[0].lat
        let longitude = res.data[0].lon
        let position = [latitude, longitude]
        setDestinationCoordinates(position)
      })
      .catch((err) => 
      {
        alert(err)
      })
  }

  const getRoute = async () => {
    await getRouteCoordinates()
    await axios.get(OSRM_SEARCH_URL)
    .then((res) => {
      console.log(res)
      const route = res.data.routes[0].geometry; // Extract the route geometry
      setRoute(route)
    })
    .catch((err) => {
      console.log(err)
    })
  }


  return (
    <div className='container wrapper'>
      <div className='container row'>
        <div className='col-6 SearchBarWrapper'>
          <InputGroup>
            <InputGroupText className='SearchIcon'><i className="bi bi-search" onClick={async (e) => {await searchLocation()}}/></InputGroupText>
            <FormControl className='AddressInputField' placeholder='Enter an address...' onChange={(e) => setAddress(e.target.value)}/>
            <Button className='RoutesButton' onClick={() => {handleRoutesMenuVisibility()}}><i class="bi bi-sign-turn-right-fill"></i> </Button>
          </InputGroup>
          <div className='RoutesWrapper'>
            <i class="bi bi-x-lg closeRoutesIcon" onClick={() => {handleRoutesMenuVisibility()}}></i>
            <InputGroup>
              <i class="bi bi-geo-alt-fill startingPointIcon routesIcon"></i>
              <FormControl 
                className='AddressInputField' 
                placeholder='Starting Point' 
                onChange={(e) => setStartingLocation(e.target.value)} 
                value={startingLocation}
              />
              <i class="bi bi-crosshair getCurrentPositionIcon routesIcon" onClick={() => setStartingUserLocation()}></i>
            </InputGroup>
            <i class="bi bi-three-dots-vertical routesIcon"></i>
            <InputGroup>
              <i class="bi bi-geo-alt-fill destinationIcon routesIcon"></i>
              <FormControl 
                className='AddressInputField' 
                placeholder='Destination'
                onChange={(e) => setDestination(e.target.value)} 
                value={destination}
              />
            </InputGroup>
            <Button onClick={() => getRoute()}>Show route</Button>
          </div>
        </div>
        <div className='col-6 GetLocationWrapper'>
          <i className="bi bi-crosshair GetLocationIcon" onClick={() => {centerOnUser()}}></i>
        </div>
        
      </div>
    </div>
  )
}
