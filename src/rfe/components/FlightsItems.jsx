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
		<div className="flex flex-col">
			<div className='flex gap-6 justify-between bg-purple-button px-10 py-5 rounded-md text-white mb-5'>
				<span className="w-1/3 text-center">{translations[selectedLanguage].flight_number}</span>
				<span className="w-1/2 text-center">
					
					{type == 'Departures' ? (
						<>
							{translations[selectedLanguage].flight_destination}
						</>
					) : (
						<>
							{translations[selectedLanguage].flight_departure}
						</>
					)}
					
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
						<div id={key} className='md:flex gap-6 md:justify-between bg-bg-dark-purple px-10 py-7 rounded-md text-white mb-3 items-center'>
							<span className="w-1/3 flex items-center">
								<img src={`./images/airlines/${flight.logoAerolinea}.png`} className=' w-1/2 h-6 opacity-70'/>
								<p className='ml-5 bg-bg-dark-blue px-4 rounded-md py-2'>{flight.numeroVuelo}</p>
							</span>
							<span className="w-1/2 flex justify-left items-center">

								{type == 'Departures' ? (
									<>
									<img className='h-6 rounded-[3px] mr-6' src={`https://flagcdn.com/w40/${flight.paisSalida.toLowerCase()}.png`} />
									<p>{flight.ICAO_Llegada} - {flight.aeropuertoLlegada}</p>
									</>
								) : (
									<>
									<img className='h-6 rounded-[3px] mr-6' src={`https://flagcdn.com/w40/${flight.paisSalida.toLowerCase()}.png`} />
									<p>{flight.ICAO_Salida} - {flight.aeropuertoSalida}</p>
									</>
								)}

							</span>
							<span className="w-1/5 text-center">{flight.horaSalida}z</span>
							<span className="w-1/5 text-center">{flight.horaLlegada}z</span>
							<span className="w-1/5 text-center">{flight.tipoAeronave}</span>
							<span className="w-1/3 text-center">
								<ButtonFlight/>
							</span>
						</div>
					</ButtonOptions.Provider>
				)
			})}
		</div>
	);
};