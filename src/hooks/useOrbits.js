import { useEffect, useState } from "react";
import { getOrbits, getActiveOrbit } from "../services/backendApi";

export function useOrbits() {
    const [orbits, setOrbits] = useState([]);
    const [activeOrbit, setActiveOrbit] = useState(null);

    async function loadOrbits() {
        try {
            const data = await getOrbits();

            const formatted = data.map(orbit => ({
                orbitNumber: orbit.orbitNumber,
                active: orbit.active,
                points: orbit.points.map(p => [
                    p.latitude,
                    p.longitude
                ])
            }));

            setOrbits(formatted);
        } catch (err) {
            console.error("Erro ao carregar órbitas", err);
        }
    }

    async function loadActiveOrbit() {
        try {
            const data = await getActiveOrbit();

            if (!data?.orbit) return;

            const orbit = data.orbit;

            setActiveOrbit({
                orbitNumber: orbit.orbitNumber,
                points: orbit.points.map(p => [
                    p.latitude,
                    p.longitude
                ])
            });

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        loadOrbits();
        loadActiveOrbit();

        const interval = setInterval(() => {
            loadActiveOrbit();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return {
        orbits,
        activeOrbit
    };
}