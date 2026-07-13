import React from 'react'
import ISSMap from './ISSmap';

const MapPanel = () => {
  return (
    <>
      <ISSMap />
      {/* Overlay Inferior Esquerdo */}
      <div className="map-overlay-bottom-left">
        <div className="update-card">
          <span>ÚLTIMA ATUALIZAÇÃO</span>
          <p>24/05/2025 12:45:30 UTC</p>
        </div>
      </div>

      {/* Overlay Inferior Direito */}
      <div className="map-overlay-bottom-right">
        <div className="legend-card">
          <div className="legend-item"><span className='dot yellow'></span> ISS POSIÇÃO ATUAL</div>
          <div className="legend-item"><span className='dot white'></span> TRAJETÓRIAS</div>          
          <div className="legend-item"><span className='dot red' ></span> TRAJETÓRIA PREVISTA</div>          
        </div>
      </div>
    </>
  );
}

export default MapPanel