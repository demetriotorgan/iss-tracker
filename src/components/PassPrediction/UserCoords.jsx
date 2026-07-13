// components/PassPrediction/UserCoords.jsx
const UserCoords = ({ lat, lon }) => (
  <div className="coords-grid">
    <div className="coord-item">
      <span className="coord-label">Latitude</span>
      <span className="coord-value">{lat?.toFixed(4) || '---'}</span>
    </div>
    <div className="coord-item">
      <span className="coord-label">Longitude</span>
      <span className="coord-value">{lon?.toFixed(4) || '---'}</span>
    </div>
  </div>
);
export default UserCoords;