import React, {useState} from 'react'
import '../../Styles/SearchBar/SearchBarStyles.css'
import {InputGroup, FormControl} from 'react-bootstrap'
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
  return (
    <div className='container wrapper'>
      <div className='container row'>
        <div className='col-6 SearchBarWrapper'>
          <InputGroup>
            <InputGroupText className='SearchIcon'><i className="bi bi-search" onClick={async (e) => {await searchLocation()}}/></InputGroupText>
            <FormControl className='AddressInputField' placeholder='Enter an address...' onChange={(e) => setAddress(e.target.value)}/>
          </InputGroup>
          
        </div>
        <div className='col-6 GetLocationWrapper'>
          <i className="bi bi-geo-alt GetLocationIcon" onClick={() => {centerOnUser()}}></i>
        </div>
        
      </div>
    </div>
  )
}
