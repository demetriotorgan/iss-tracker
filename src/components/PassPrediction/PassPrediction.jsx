import React, { useMemo } from 'react'
import './PassPrediction.css'
import { useTelemetry } from '../../hooks/useTelemetry'
import { useUserLocation } from '../../hooks/useUserLocation'
import { calculateDistance } from '../../services/distanceUtils';
import OpportunityWindow from './OpportunityWindow';
import UserCoords from './UserCoords';
import { checkVisibility } from '../../services/orbitUtils'

const PassPrediction = () => {
  const { telemetry, loading: telLoading, error: telError } = useTelemetry();
  const { coords, utcTime, loading: locLoading, error: locError } = useUserLocation();

  const distance = useMemo(() => {    
    if (!telemetry || !coords || coords.lat === null || coords.lon === null) {
      return null;
    }

    return calculateDistance(
      coords.lat,
      coords.lon,
      telemetry.latitude,
      telemetry.longitude
    );
  }, [telemetry, coords]);

  const isVisible = useMemo(() => 
    checkVisibility(distance, telemetry?.visibility), 
  [distance, telemetry]);


  // 1. Verificação de Carregamento
  if (telLoading || locLoading) {
    return <div className="card-loading">Sincronizando sensores...</div>;
  }

  // 2. Verificação de Erro
  if (telError || locError) {
    return (
      <div className="card-error">
        Erro:  {telError || locError}
      </div>
    );
  }

  // 3. Verificação de Dados (se não estiver carregando mas não tivermos distância ainda)
  if (distance === null) {
    return <div className="loading-state">Aguardando cálculo de órbita...</div>;
  }

  return (
  <div className="dashboard-card pass-prediction">
      <div className="card-header"><h3>PREVISÃO DE PASSAGEM</h3></div>  
      <div className="card-body">        
        {/* Hierarquia ajustada para legibilidade industrial */}
        <div className="data-row">
          <span className="label">Distância ISS:</span>
          <span className="value-highlight">{distance.toFixed(0)} km</span>
        </div>
        
        <div className="window-container">
            <OpportunityWindow 
              distance={distance} 
              isVisible={isVisible} 
              visibilityStatus={telemetry.visibility} 
            />
        </div>
      </div>
   </div>
  )
}

export default PassPrediction