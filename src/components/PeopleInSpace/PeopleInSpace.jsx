import './PeopleInSpace.css'
import React from 'react'
import { usePeopleInSpace } from '../../hooks/usePeopleInSpace'

const PeopleInSpace = () => {
  const pessoasISS = usePeopleInSpace();

  if (!pessoasISS) {
    return <p>Aguardando dados...</p>;
  }

  return (
    <div className='container-pessoas'>
      <h3>Pessoas na ISS</h3>

      <p className='contador-tripulacao'>
        Tripulação atual: {pessoasISS.number}
      </p>

      <ul className='lista-astronautas'>
        {pessoasISS.people.map((pessoa, index) => (
          <li key={index}>
            👨‍🚀 {pessoa.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PeopleInSpace;