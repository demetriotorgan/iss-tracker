import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet';
import issIconImage from '../../assets/station.png'

const issIcon = new L.Icon({
    iconUrl: issIconImage,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25]
});

const ISS = ({ issData }) => {

    const position = [
        issData.latitude,
        issData.longitude
    ];

    return (
        <>
            <Marker 
            position={position}
            icon={issIcon}>
                <Popup>
                    <div>
                        <h3>ISS</h3>
                        <p>Lat: {issData.latitude}</p>
                        <p>Lng: {issData.longitude}</p>
                    </div>
                </Popup>
            </Marker>
        </>
    )
}

export default ISS