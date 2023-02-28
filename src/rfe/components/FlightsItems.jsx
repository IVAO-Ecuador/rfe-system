import React, { createContext, useContext, useEffect, useState } from 'react';
import { PageContext } from '../pages/HomePage';
import { translations } from '../translate/translations';
import { ButtonFlight } from './ButtonFlight';
import { FlightsList } from './FlightsTable';

export const ButtonOptions = createContext();

export const FlightsItems = () => {

	const { selectedLanguage, userLogged } = useContext(PageContext);
	const { selectAirport, type } = useContext(FlightsList);
	const [ flightsInfo , setFlightsInfo ] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const url = buildUrl(selectAirport, type);
			const response = await fetch(url);
			const result = await response.json();
			setFlightsInfo(result);
		}
		fetchData();
	}, [selectAirport, type]);

	const buildUrl = (selectAirport, type) => {
		let url = "https://api.ec.ivao.aero/api/rfo/flights";
		url += `?selectAirport=${selectAirport}&type=${type}`;
		return url;
	};

	return (
		<div className="md:flex lg:flex-col gap-x-5">
			<div className='lg:flex gap-6 justify-between bg-purple-button px-10 py-5 rounded-md text-white mb-5 hidden'>
				<span className="w-1/3 text-center">{translations[selectedLanguage].flight_number}</span>
				<span className="w-1/2 text-center">
					{type == 'Departures' ? (<>{translations[selectedLanguage].flight_destination}</>) : (<>{translations[selectedLanguage].flight_departure}</>)}
				</span>
				<span className="w-1/5 text-center">{translations[selectedLanguage].departure_time}</span>
				<span className="w-1/5 text-center">{translations[selectedLanguage].arrival_time}</span>
				<span className="w-1/5 text-center">{translations[selectedLanguage].aircraft}</span>
				<span className="w-1/3 text-center">{translations[selectedLanguage].flight_status}</span>
			</div>
			{flightsInfo.map((flight) => {

				const randomCode = Math.random().toString(36).substring(2, 8);
				const key = randomCode.replace(/(\w{3})(\w{3})/, '$1-$2');

				return (
					<ButtonOptions.Provider key={randomCode} value={{flight, userLogged}}>
						<div id={key} className='lg:flex lg:w-full md:w-1/2 w-full gap-6 md:justify-between bg-bg-dark-purple md:px-10 py-7 px-5 rounded-md text-white lg:mb-3 mb-6 items-center'>
							<span className="lg:w-1/3 w-full flex lg:items-center lg:mb-0 mb-8">
								<img src={`./images/airlines/${flight.logoAerolinea}.png`} className=' w-1/2 lg:h-6 opacity-70'/>
								<p className='ml-5 bg-bg-dark-blue px-4 rounded-md py-2 w-full text-center'>{flight.numeroVuelo}</p>
							</span>

							<p className='lg:hidden mb-4 font-medium'>{type == 'Departures' ? (<>{translations[selectedLanguage].flight_destination}:</>) : (<>{translations[selectedLanguage].flight_departure}:</>)}</p>
							<span className="lg:w-1/2 w-full flex lg:justify-end justify-start items-center max-lg:bg-bg-dark-blue max-lg:p-5 max-lg:rounded-md max-lg:mb-5 max-lg:h-[120px]">

								{type == 'Departures' ? (
									<>
									<img className='h-7 rounded-[3px] lg:mr-6 mr-4' src={`https://flagcdn.com/w40/${flight.paisSalida.toLowerCase()}.png`} />
									<p className='text-left'>{flight.ICAO_Llegada} - {flight.aeropuertoLlegada}</p>
									</>
								) : (
									<>
									<img className='h-7 rounded-[3px] lg:mr-6 mr-4' src={`https://flagcdn.com/w40/${flight.paisSalida.toLowerCase()}.png`} />
									<p className='text-left'>{flight.ICAO_Salida} - {flight.aeropuertoSalida}</p>
									</>
								)}

							</span>
							<p className="lg:w-1/5 w-full lg:text-center max-lg:mb-4"><span className='lg:hidden font-medium'>{translations[selectedLanguage].departure_time}: </span><span className='max-lg:py-1 max-lg:p-3 max-lg:bg-bg-dark-blue max-lg:rounded-md max-lg:float-right'>{flight.horaSalida}z</span></p>
							<p className="lg:w-1/5 w-full lg:text-center max-lg:mb-4"><span className='lg:hidden font-medium'>{translations[selectedLanguage].arrival_time}: </span><span className='max-lg:py-1 max-lg:p-3 max-lg:bg-bg-dark-blue max-lg:rounded-md max-lg:float-right'>{flight.horaLlegada}z</span></p>
							<p className="lg:w-1/5 w-full lg:text-center max-lg:mb-4"><span className='lg:hidden font-medium'>{translations[selectedLanguage].aircraft}: </span><span className='max-lg:py-1 max-lg:p-3 max-lg:bg-bg-dark-blue max-lg:rounded-md max-lg:float-right'>{flight.tipoAeronave}</span></p>
							<div className="lg:w-1/3 w-full lg:text-center max-lg:mt-10 text-center">
								<ButtonFlight/>
							</div>
						</div>
					</ButtonOptions.Provider>
				)
			})}
		</div>
	);
};