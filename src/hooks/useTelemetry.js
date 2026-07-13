import { useState, useEffect } from 'react';
import { getISSPosition } from '../services/api';

export function useTelemetry(interval = 10000) {

    const [telemetry, setTelemetry] = useState(null);
    const [velocityHistory, setVelocityHistory] = useState([]);
    const [altitudeHistory, setAltitudeHistory] = useState([]);
    

    

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        const time = new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        try {
            const data = await getISSPosition();               

            setTelemetry(data);

            setVelocityHistory(prev => {
                const newPoint = {
                    time,
                    velocity: Number(data.velocity.toFixed(2)),
                    timestamp: data.timestamp
                };
                return [...prev, newPoint].slice(-20);
            });

            setAltitudeHistory(prev => {
                const point = {
                    time,
                    altitude: Number(data.altitude.toFixed(2)),
                    timestamp: data.timestamp
                };
                return [...prev, point].slice(-20);
            });            

            setLoading(false);

        } catch (err) {
            console.error('Telemetry Error:', err);
            setError(err.message);
            setLoading(false);

        }
    };

    useEffect(() => {
        fetchData();
        const timer = setInterval(fetchData, interval);
        return () => clearInterval(timer);
    }, [interval]);

    return {
        telemetry,
        velocityHistory,
        altitudeHistory,        
        loading,
        error
    };
}