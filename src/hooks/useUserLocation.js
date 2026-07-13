import { useState, useEffect } from 'react';

export const useUserLocation = () => {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [utcTime, setUtcTime] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setLoading(false); // Sucesso: desativa loading
        },
        (err) => {
          setError(err.message);
          setLoading(false); // Erro: desativa loading também!
        }
      );
    } else {
      setError("Geolocalização não suportada");
      setLoading(false);
    }

    // 2. Sincroniza horário UTC a cada segundo
    const interval = setInterval(() => {
      setUtcTime(new Date().toISOString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { coords, utcTime, error,loading };
};