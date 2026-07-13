import React, { useEffect, useRef, useState } from 'react';
import { useTelemetry } from '../../hooks/useTelemetry';
import TelemetryChart from './TelemetryChart';
import './Analytics.css';
import { useUserLocation } from '../../hooks/useUserLocation';
import { calculateDistance } from '../../services/distanceUtils';
import { useMissionLog } from '../../hooks/useMissionLog';

const Analytics = () => {

  const {
    telemetry,
    velocityHistory,
    altitudeHistory,
    loading,
    error
  } = useTelemetry();
  const { addLog } = useMissionLog();
  const lastTimestampRef = useRef(null);

  const { coords } = useUserLocation();
  const [distanceHistory, setDistanceHistory] = useState([]);

  useEffect(() => {
    if (!telemetry || !coords || coords.lat === null || coords.lon === null) {
      return
    }

    const distance = calculateDistance(
      coords.lat,
      coords.lon,
      telemetry.latitude,
      telemetry.longitude
    );

    const time = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const point = {
      time,
      distance: Number(distance.toFixed(0)),
      timestamp: telemetry.timestamp
    };

    if (lastTimestampRef.current !== telemetry.timestamp) {
      addLog(
        'analytics',
        `Distance recalculated: ${distance.toFixed(0)} km`
      );
      lastTimestampRef.current =
        telemetry.timestamp;
    }

    setDistanceHistory(prev => {
      if (prev.length > 0 && prev[prev.length - 1].timestamp === telemetry.timestamp) {
        return prev;
      }
      
      return [...prev, point].slice(-20);
    });  

  }, [telemetry, coords]);

  if (loading) {
    return (
      <section className="analytics">
        <div className="chart-card">
          Carregando telemetria...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="analytics">
        <div className="chart-card">
          Erro: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="analytics">

      <div className="chart-card">
        <h3 className="chart-title">
          Velocidade (km/h)
        </h3>

        <TelemetryChart
          data={velocityHistory}
          dataKey="velocity"
          color="#00A3FF"
          unit="km/h"
        />
      </div>

      <div className="chart-card">
        <h3 className="chart-title">
          Altitude (km)
        </h3>

        <TelemetryChart
          data={altitudeHistory}
          dataKey="altitude"
          color="#00D084"
          unit="km"
        />
      </div>

      <div className="chart-card">
        <h3 className="chart-title">
          Distância ISS
        </h3>

        <TelemetryChart
          data={distanceHistory}
          dataKey="distance"
          color="#FFB800"
          unit="km"
        />
      </div>

    </section>
  );
};

export default Analytics;