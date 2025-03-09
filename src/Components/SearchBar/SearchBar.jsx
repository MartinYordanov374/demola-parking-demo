import React from 'react'
import '../../Styles/SearchBar/SearchBarStyles.css'
import {InputGroup, FormControl} from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
export default function SearchBar() {
  return (
    <div className='container wrapper'>
      <div className='container row'>
        <div className='col-6 SearchBarWrapper'>
          <InputGroup>
            <InputGroupText className='SearchIcon'><i className="bi bi-search"/></InputGroupText>
            <FormControl className='AddressInputField' placeholder='Enter an address...'/>
          </InputGroup>
          
        </div>
        <div className='col-6 GetLocationWrapper'>
          <i className="bi bi-geo-alt GetLocationIcon"></i>
        </div>
        
      </div>
    </div>
  )
}
