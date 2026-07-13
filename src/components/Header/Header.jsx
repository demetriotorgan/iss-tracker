import React from 'react'
import NasaLogo from '../../assets/NasaLogo'
import './Header.css'
import Clock from './Clock'
import { useApiHealth } from '../../hooks/useApiHealth'

const Header = () => {
  const status = useApiHealth();
  
  return (
    <>
      <header className="dashboard-header">
        <div className='header-left'>
          <NasaLogo className="logo-nasa" width="45" height="45" />
          <div className="header-titles">
            <h1>ISS TRACKER</h1>
            <span className="subtitle">REAL TIME DASHBOARD</span>
          </div>
        </div>

        <div className="header-right">
          <Clock />
          <div className="status-container">
            <div className="status-live">
              <span className="dot"></span> LIVE
            </div>
            <span className="status-label">CONECTADO</span>
          </div>
          <div className="iss-info">
            <img src="src/assets/issImage.png" alt="ISS" className="iss-icon" />
            <div className="iss-text">
              <span>International</span>
              <span>Space Station</span>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header