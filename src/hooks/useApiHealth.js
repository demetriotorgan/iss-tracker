import { useEffect, useState } from "react"
import { useMissionLog } from "./useMissionLog";
import { getHealthCeck } from "../services/backendApi";

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
                const statusCheck = await getHealthCeck();
                // console.log(statusCheck);
                addLog('ISS-API', 'Database connected');
                setStatus({
                    api:true,
                    mongodb:statusCheck.mongodb,
                    readyState:statusCheck.readyState
                });
                // console.log('Atualizando estado:', statusCheck);
            } catch (error) {
                  console.error('Health Check Error:', error);
                addLog('ISS-API', 'Database disconnected');
                 setStatus({
                    api:false,
                    mongodb:'disconnected',
                    readyState:'0'
                });
            }
        }
        verificar();
    },[]);

//     useEffect(() => {
//     console.log('Status mudou:', status);
// }, [status]);

    return status
};