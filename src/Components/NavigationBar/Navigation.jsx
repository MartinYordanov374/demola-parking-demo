import React from 'react'
import '../../Styles/NavigationBar/NavigationBarStyles.css'
export default function Navigation() {
  return (
    <div className='NavigationWrapper'>
      <div className='NavigationContainer container'>
        <div className='row'>
          <div className='col-xl-4 NavigationButton'>
            <i class="bi bi-funnel"></i> Filters
          </div>
          <div className='col-xl-4 NavigationButton'>
            <i class="bi bi-house"></i> Home
          </div>
          <div className='col-xl-4 NavigationButton'>
            <i class="bi bi-gear"></i> Settings
          </div>
        </div>
      </div>
    </div>
  )
}
