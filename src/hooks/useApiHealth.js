import { useEffect, useState } from "react"
import api from "../services/api";
import { useMissionLog } from "./useMissionLog";

export function useApiHealth(){
    const {addLog} = useMissionLog();    
    const [status, setStatus] = useState({
        api:false,
        mongodb :'',
        readyState:''
    });

    useEffect(()=>{
        async function verificar(){
            try {
                const response = await api.get('/iss/health');
                addLog('ISS-API', 'Database connected');
                setStatus({
                    api:true,
                    mongodb:response.data.mongodb,
                    readyState:response.data.readyState
                });
            } catch (error) {
                addLog('ISS-API', 'Database disconnected');
                 setStatus({
                    api:false,
                    mongodb:'disconnected',
                    readyState:'0'
                });
            }
        }
        verificar();
    },[addLog]);
    return status
};