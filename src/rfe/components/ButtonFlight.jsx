import React, { useContext } from 'react'
import { PageContext } from '../pages/HomePage';
import { translations } from '../translate/translations';
import { ButtonOptions } from './FlightsItems';

export const ButtonFlight = () => {

	const { selectedLanguage } = useContext(PageContext);
    const { flight, userLogged } = useContext(ButtonOptions);
    const userInfo = userLogged[0];
  return (
	
	<div>
      {flight.estadoVuelo === 'Libre' ? 
	  		<a href='#' className='block w-full bg-green p-3 rounded-md'>{translations[selectedLanguage].button_available}</a> :
       flight.estadoVuelo === 'Reservado' ?
	   		<div className='w-full bg-yellow p-3 rounded-md'>{translations[selectedLanguage].button_waitingConfirmation}</div> :
       flight.estadoVuelo === 'Confirmado' ?
	   		<div className='w-full bg-red p-3 rounded-md'>{translations[selectedLanguage].button_booked} <span className='font-medium'>{flight.VID}</span></div> :
       <p>Opción no válida</p>}
    </div>

    
  )
}
