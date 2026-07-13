import React, { useEffect, useRef } from 'react'
import { useTelemetry } from '../../hooks/useTelemetry';
import { Moon, Sun } from 'lucide-react';
import './TelemetryPanel.css'
import { useMissionLog } from '../../hooks/useMissionLog';

const TelemetryPanel = () => {
  const { telemetry, loading, error } = useTelemetry(5000);
  const { addLog } = useMissionLog();
  const previousVisibility = useRef(null);

  //useEffect para terminal de log
  useEffect(() => {

    
    if (!telemetry) return;

    if (previousVisibility.current === null) {

        previousVisibility.current =
            telemetry.visibility;

        addLog(
            'telemetry',
            `Initial visibility: ${telemetry.visibility}`
        );

        return;
    }

    if (
        previousVisibility.current !==
        telemetry.visibility
    ) {

        if (
            telemetry.visibility === 'eclipsed'
        ) {

            addLog(
                'telemetry',
                'ISS entered Earth shadow'
            );

        } else {

            addLog(
                'telemetry',
                'ISS returned to sunlight'
            );

        }
    }

    previousVisibility.current =
        telemetry.visibility;

  }, [telemetry]);

  // Função auxiliar para renderizar o ícone de status
  const renderVisibilityIcon = (visibility) => {
    return visibility === 'eclipsed'
      ? <Moon size={14} className="icon-moon" />
      : <Sun size={14} className="icon-sun" />;
  };

  if (loading) return <div className="telemetry-loading">Carregando telemetria...</div>;
  if (error) return <div className="telemetry-error">Erro: {error}</div>;

  return (
    <div className="telemetry-grid">
      {/* LINHA 1 */}
      <div className="data-item">
        <span>LATITUDE</span>
        <p>{telemetry.latitude.toFixed(4)}°</p>
      </div>
      <div className="data-item">
        <span>LONGITUDE</span>
        <p>{telemetry.longitude.toFixed(4)}°</p>
      </div>

      {/* LINHA 2 */}
      <div className="data-item">
        <span>ALTITUDE</span>
        <p>{telemetry.altitude.toFixed(0)} KM</p>
      </div>
      <div className="data-item">
        <span>VELOCIDADE</span>
        <p>{telemetry.velocity.toFixed(0)} KM/H</p>
      </div>

      {/* LINHA 3 */}
      <div className="data-item">
        <span>COBERTURA (FOOTPRINT)</span>
        <p>{telemetry.footprint.toFixed(0)} KM²</p>
      </div>

      {/* Aqui você tem duas opções para o 6º slot: */}
      {/* Opção A: Colocar outro dado (ex: timestamp ou solar_lat) */}
      {/* Opção B: Deixar vazio (se quiser manter o layout de 2 colunas) */}
      <div className="data-item">
        <span>SOLAR LAT</span>
        <p>{telemetry.solar_lat.toFixed(2)}°</p>
      </div>

      {/* LINHA 4 (Ocupa as duas colunas totalmente) */}
      <div className="data-item full-width">
        <div className="label-with-icon">
          <span>VISIBILIDADE</span>
          {renderVisibilityIcon(telemetry.visibility)}
        </div>
        <p>{telemetry.visibility.toUpperCase()}</p>
      </div>
    </div>
  )
}

export default TelemetryPanel