import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'

const MapController = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        map.panTo(position)
    }, [position, map]);
    return null
}

export default MapController