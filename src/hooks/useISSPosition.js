import { useEffect, useState } from "react";
import { getISSPastPositions, getISSPosition } from "../services/api";
import { saveISSPosition } from "../services/backendApi";
import { useMissionLog } from "./useMissionLog";

export function useISSPosition() {
    const [issData, setIssData] = useState(null);
    const { addLog } = useMissionLog();

    async function loadISS() {
        try {
            const data = await getISSPosition();

            await saveISSPosition({
                latitude: data.latitude,
                longitude: data.longitude,
                altitude: data.altitude,
                velocity: data.velocity,
                visibility: data.visibility,
                timestamp: data.timestamp
            });
            setIssData(data);

            addLog(
                "tracking",
                "ISS position updated"
            );
        } catch (error) {
            addLog(
                "warning",
                "ISS position fetch failed"
            );
            console.error("Erro ao carregar ISS:", error);
        }
    };

    useEffect(() => {
        addLog(
            "system",
            "ISS tracking service started"
        );

        loadISS();

        const timer = setInterval(() => {
            loadISS();
        }, 5000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    return {
        issData
    }
}