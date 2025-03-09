import React from 'react'
import '../../Styles/SearchBar/SearchBarStyles.css'

export default function SearchBar() {
  return (
    <div className='wrapper'>
      <div className='container'>
        <i className="bi bi-search"></i>
        <span>Enter an address...</span>
      </div>
    </div>
  )
}
