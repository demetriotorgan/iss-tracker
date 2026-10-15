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

        // Garante que o intervalo respeite o limite mínimo da API (1 requisição por segundo)
        const safeInterval = Math.max(interval, 5000);

        async function fetchData() {
            if (!active) return;

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

            } catch (err) {
                if (!active) return;

                console.error('Telemetry Error:', err);
                setError(err.message);
                setLoading(false);

                // Se houver estouro de rate limit (429), podemos lidar com logs ou ajustes se necessário
                if (err.status === 429) {
                    console.warn('Rate limit atingido. A API está bloqueando temporariamente novas requisições.');
                }
            }
        }

        // Executa a primeira vez imediatamente ao montar
        fetchData();

        // Configura o intervalo fixo de repetição de forma segura
        const timer = setInterval(fetchData, safeInterval);

        return () => {
            active = false;
            clearInterval(timer);
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