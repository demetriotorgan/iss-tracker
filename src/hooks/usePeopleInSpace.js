import { useEffect, useState } from "react"
import { peopleInSpace } from "../services/api";

export function usePeopleInSpace(){
const [peoples, setPeople]=useState();

useEffect(()=>{
async function buscarPessoas(){
    try {
        const response = await peopleInSpace();
        const pessoasISS = response.people.filter(
            pessoa => pessoa.craft === 'ISS'
        );
        const dadosISS = {
            number:pessoasISS.length,
            people:pessoasISS
        };
        console.log('Pessoas na ISS: ', dadosISS);
        setPeople(dadosISS);
        
    } catch (error) {
        console.error(error);
    }
}
buscarPessoas();
},[])
    return peoples
}