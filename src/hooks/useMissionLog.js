import { useContext } from "react";
import { MissionLogContext } from "../context/MissionLogContext";

export function useMissionLog(){
    const context = useContext(MissionLogContext);
    
    if(!context){
        throw new Error(
            "useMissionLog deve ser usado dentro de MissionLogProvider"
        )
    }
    return context;
}