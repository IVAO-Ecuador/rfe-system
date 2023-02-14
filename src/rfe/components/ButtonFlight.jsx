import React, { useContext } from 'react'
import { ButtonOptions } from './FlightsItems';

export const ButtonFlight = () => {

    const { flight } = useContext(ButtonOptions);

  return (
    <div className='w-full bg-green p-3 rounded-md'>Reservado por <span className='font-medium'>625219</span></div>
  )
}
