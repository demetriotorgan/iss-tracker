import React, { useEffect, useState } from 'react'
import ISSMap from './ISSmap';
import { getISSPosition } from '../../services/api';

const MapPanel = () => {
  const [utcData, setUtcData] = useState();
  const [utcTime, setUtcTime] = useState();

  const [timestampIss, setTimestampIss] = useState(null);
  const [segundosDesdeAtualizacao, setSegundosDesdeAtualizacao] = useState(0);

  useEffect(() => {
    async function carregarTimeUtc() {
      try {
        const timeStampUtc = await getISSPosition();
        setTimestampIss(timeStampUtc.timestamp);

        const dataAtualizacao = new Date(timeStampUtc.timestamp * 1000);
        setUtcData(dataAtualizacao.toLocaleDateString('pt-BR'));
        setUtcTime(dataAtualizacao.toLocaleTimeString('pt-BR'));

      } catch (error) {
        console.error(error);
      }
    }
    carregarTimeUtc();
  }, []);

  useEffect(() => {
    if (!timestampIss) return;

    const atualizarContador = () => {
      const agora = Math.floor(Date.now() / 1000);
      setSegundosDesdeAtualizacao(agora - timestampIss)
    };

    atualizarContador();

    const interval = setInterval(
      atualizarContador, 1000
    );
    return () => clearInterval(interval)
  }, [timestampIss]);

  return (
    <>
      <ISSMap />
      {/* Overlay Inferior Esquerdo */}
      <div className="map-overlay-bottom-left">
        <div className="update-card">
          <span>ÚLTIMA ATUALIZAÇÃO</span>
          <p>{utcData} {utcTime} UTC</p>
          <small>
            Há {segundosDesdeAtualizacao}s
          </small>
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