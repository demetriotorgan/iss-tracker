import React from 'react'
import { usePeopleInSpace } from '../../hooks/usePeopleInSpace'

const PeopleInSpace = () => {
  const people= usePeopleInSpace();
  // console.log('Pessoas no Espaço: ', people);
  return (
    <div>PeopleInSpace</div>
  )
}

export default PeopleInSpace