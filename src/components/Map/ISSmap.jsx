import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import ISS from "./ISS";
import { useEffect } from "react";
import { useISSPosition } from "../../hooks/useISSPosition";
import MapController from "./MapController";
import { useOrbits } from "../../hooks/useOrbits";
import ReferenceLines from "./ReferenceLines";

function ISSMap() {
    const { issData } = useISSPosition();
    const { orbits, activeOrbit } = useOrbits();


    if (!issData) {
        return <p>Carregando ISS...</p>;
    }

    const position = [
        issData.latitude,
        issData.longitude
    ];

    return (
        <>
            <MapContainer
                center={[0, 0]}
                zoom={2}
                style={{
                    height: "100%",
                    width: "100%"
                }}
            >
                <TileLayer
                    url={`https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=${import.meta.env.VITE_CARTO_API_KEY}`}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <ReferenceLines />
                <ISS issData={issData} />

                <MapController position={position} />

                {/* ÓRBITAS HISTÓRICAS (BACKEND) */}
                {orbits.map((orbit) => (
                    <Polyline
                        key={`orbit-${orbit.orbitNumber}`}
                        positions={orbit.points}
                        pathOptions={{
                            color: 'white',
                            weight: 1,
                            opacity: 0.9,
                            dashArray: '1,8'
                        }}
                    />
                ))}

                {/* ÓRBITA ATIVA (opcional destaque) */}
                {activeOrbit && (
                    <Polyline
                        positions={activeOrbit.points}
                        pathOptions={{
                            color: "yellow",
                            weight: 2,
                            opacity: 1,
                            dashArray: '2,8'
                        }}
                    />
                )}
            </MapContainer>
        </>
    );
}

export default ISSMap;