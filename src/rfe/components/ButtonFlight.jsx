import React, { useContext } from 'react'
import { ButtonOptions } from './FlightsItems';

export const ButtonFlight = () => {

    const { flight, userLogged } = useContext(ButtonOptions);
    const userInfo = userLogged[0];

  return (
	
	<div>
      {flight.estadoVuelo === 'Libre' ? 
	  		<a href='#' className='block w-full bg-green p-3 rounded-md'>Disponible</a> :
       flight.estadoVuelo === 'Reservado' ?
	   		<div className='w-full bg-yellow p-3 rounded-md'>Esperando confirmación</div> :
       flight.estadoVuelo === 'Confirmado' ?
	   		<div className='w-full bg-red p-3 rounded-md'>Reservado por <span className='font-medium'>{flight.VID}</span></div> :
       <p>Opción no válida</p>}
    </div>

    
  )
}
