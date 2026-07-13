import { createContext, useEffect, useState } from "react";

export const MissionLogContext = createContext();
export function MissionLogProvider({ children }) {

    const [logs, setLogs] = useState([]);

    const addLog = (type, message) => {
        const timestamp = new Date().toLocaleTimeString("pt-BR", {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const novoLog = {
            id: Date.now(),
            timestamp,
            type,
            message
        }
        setLogs(prev => [...prev.slice(-99), novoLog]);
    }
    
    return (
        <MissionLogContext.Provider
            value={{
                logs,
                addLog
            }}>
            {children}

        </MissionLogContext.Provider>
    )
};