
import { useState, useEffect } from 'react';
import { getISSPosition } from '../services/api';

export function useTelemetry(interval = 10000) {
    const [telemetry, setTelemetry] = useState(null);
    const [velocityHistory, setVelocityHistory] = useState([]);
    const [altitudeHistory, setAltitudeHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;
        let timer;
        let retryDelay = interval;

        async function fetchData() {
            const time = new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            });

            try {
                const data = await getISSPosition();

                if (!active) return;

                setTelemetry(data);
                setError(null);
                setLoading(false);

                setVelocityHistory(prev => [
                    ...prev,
                    {
                        time,
                        velocity: Number(data.velocity.toFixed(2)),
                        timestamp: data.timestamp
                    }
                ].slice(-20));

                setAltitudeHistory(prev => [
                    ...prev,
                    {
                        time,
                        altitude: Number(data.altitude.toFixed(2)),
                        timestamp: data.timestamp
                    }
                ].slice(-20));

                // Retoma o intervalo normal após o sucesso.
                retryDelay = interval;

            } catch (err) {
                if (!active) return;

                console.error('Telemetry Error:', err);
                setError(err.message);
                setLoading(false);

                // Evita insistir na API após um HTTP 429.
                if (err.status === 429) {
                    retryDelay = Math.max(
                        retryDelay * 2,
                        30000
                    );
                }
            }

            if (active) {
                timer = setTimeout(fetchData, retryDelay);
            }
        }

        fetchData();

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [interval]);

    return {
        telemetry,
        velocityHistory,
        altitudeHistory,
        loading,
        error
    };
}
