import React, { useEffect, useState } from 'react'
import { formatarData, timeString } from '../../services/date';

const Clock = () => {
    const [utcTime, setUtcTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setUtcTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
       <div className="utc-clock">
            <span className="utc-label">SYSTEM</span>
            <span className="utc-time">{timeString(utcTime)}</span>
            <span className="utc-date">{formatarData(utcTime)}</span>
          </div>
    )
}

export default Clock