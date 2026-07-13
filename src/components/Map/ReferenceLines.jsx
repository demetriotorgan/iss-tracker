import React from 'react'
import { Polyline } from 'react-leaflet';

const ReferenceLines = () => {
    const meridian = [
        [-90, 0],
        [90, 0]
    ];

    const antimeridian = [
        [-90, 180],
        [90, 180]
    ];

    const antimeridianNegative = [
        [-90, -180],
        [90, -180]
    ];

  return (
    <>
    {/* Meridiano de Greenwich */}
            <Polyline
                positions={meridian}
                pathOptions={{
                    color: "blue",
                    weight: 1,
                    opacity: 0.5,
                    dashArray: "4, 6"
                }}
            />

            {/* Antimeridiano (lado direito) */}
            <Polyline
                positions={antimeridian}
                pathOptions={{
                    color: "red",
                    weight: 1,
                    opacity: 0.5,
                    dashArray: "4, 6"
                }}
            />

            {/* Antimeridiano (lado esquerdo - wrap do mapa) */}
            <Polyline
                positions={antimeridianNegative}
                pathOptions={{
                    color: "red",
                    weight: 1,
                    opacity: 0.5,
                    dashArray: "4, 6"
                }}
            />

    </>
  )
}

export default ReferenceLines