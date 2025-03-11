import React, {useState} from 'react'
import '../../Styles/SearchBar/SearchBarStyles.css'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
import axios from 'axios'

export default function SearchBar({mapPosition, setMapPosition, setHasMapRecentered, setDestinationName, userPosition}) {
  let [address,setAddress] = useState('')
  const OSM_SEARCH_URL = `https://nominatim.openstreetmap.org/search.php?q=${address}&format=jsonv2`
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
              <FormControl className='AddressInputField' placeholder='Starting Point' onChange={(e) => setAddress(e.target.value)}/>
              <i class="bi bi-crosshair getCurrentPositionIcon routesIcon"></i>
            </InputGroup>
            <i class="bi bi-three-dots-vertical routesIcon"></i>
            <InputGroup>
              <i class="bi bi-geo-alt-fill destinationIcon routesIcon"></i>
              <FormControl className='AddressInputField' placeholder='Destination'/>
            </InputGroup>
          </div>
        </div>
        <div className='col-6 GetLocationWrapper'>
          <i className="bi bi-crosshair GetLocationIcon" onClick={() => {centerOnUser()}}></i>
        </div>
        
      </div>
    </div>
  )
}
