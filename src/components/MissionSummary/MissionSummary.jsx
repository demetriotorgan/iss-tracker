import React, { useEffect, useRef } from 'react'
import { useMissionLog } from '../../hooks/useMissionLog';
import './MissionSummary.css'
const MissionSummary = () => {
  const { logs } = useMissionLog();
  const logRef = useRef(null);

  useEffect(() => {

    if (logRef.current) {
      logRef.current.scrollTop =
        logRef.current.scrollHeight;
    }

  }, [logs]);

  return (
    <div className="mission-summary">

      <div className="mission-header">
        <h3>● MISSION EVENT LOG</h3>
        <span className="event-counter">
          EVENTS: {logs.length}
        </span>
      </div>

      <div ref={logRef} className="mission-log-container">

        {logs.length === 0 ? (
          <div className="empty-log">
            Waiting for mission events...
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={log.id}
              className={`
        log-entry
        log-${log.type}
        ${index === logs.length - 1 ? 'latest-log' : ''}
    `}
            >
              <span className="log-time">
                [{log.timestamp}]
              </span>

              <span className="log-type">
                {log.type.toUpperCase()}
              </span>

              <span className="log-message">
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="terminal-cursor">
        █
      </div>
    </div>
  )
}

export default MissionSummary