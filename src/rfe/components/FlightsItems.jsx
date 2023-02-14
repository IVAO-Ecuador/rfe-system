import React, { useContext, useEffect, useState } from 'react';
import { PageContext } from '../pages/HomePage';
import { translations } from '../translate/translations';
import { FlightsList } from './FlightsTable';

export const FlightsItems = () => {

	const { selectedLanguage, userLogged } = useContext(PageContext);
	const { selectAirport, type } = useContext(FlightsList);
	const [flightsInfo, setFlightsInfo] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const url = buildUrl(selectAirport, type);
			console.log(url)
			const response = await fetch(url);
			const result = await response.json();
			setFlightsInfo(result);
		}
		fetchData();
	}, [selectAirport, type]);

	const buildUrl = (selectAirport, type) => {
		let url = "http://localhost:2020/api/flights";
		url += `?selectAirport=${selectAirport}&type=${type}`;
		return url;
	};

	return (
		<div className="flex flex-col">
			<div className='flex gap-6 justify-between bg-purple-button px-10 py-5 rounded-md text-white mb-5 text-center'>
				<span className="w-1/6"></span>
				<span className="w-1/4">{translations[selectedLanguage].flight_number}</span>
				<span className="w-1/2">
					
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
				<span className="w-1/4">{translations[selectedLanguage].departure_time}</span>
				<span className="w-1/4">{translations[selectedLanguage].arrival_time}</span>
				<span className="w-1/5">{translations[selectedLanguage].aircraft}</span>
				<span className="w-1/5">{translations[selectedLanguage].flight_status}</span>
			</div>
			{flightsInfo.map((flight) => {
				return (
					<div className='md:flex gap-6 md:justify-between bg-bg-dark-purple px-10 py-7 rounded-md text-white text-left mb-3 text-center'>
						<span className="w-1/6 flex items-left"><img src={`/src/assets/airlines/${flight.logoAerolinea}.png`} className='px-2' /></span>
						<span className="w-1/4">{flight.numeroVuelo}</span>
						<span className="w-1/2 flex justify-left">

							{type == 'Departures' ? (
								<>
								<img className='h-6 rounded-[3px] mr-6' src={`https://flagcdn.com/w40/${flight.paisSalida.toLowerCase()}.png`} />
								{flight.ICAO_Llegada} - {flight.aeropuertoLlegada}
								</>
							) : (
								<>
								<img className='h-6 rounded-[3px] mr-6' src={`https://flagcdn.com/w40/${flight.paisSalida.toLowerCase()}.png`} />
								{flight.ICAO_Salida} - {flight.aeropuertoSalida}
								</>
							)}

							
						</span>
						<span className="w-1/4">{flight.horaSalida}z</span>
						<span className="w-1/4">{flight.horaLlegada}z</span>
						<span className="w-1/5">{flight.tipoAeronave}</span>
						<span className="w-1/5">{flight.estatus}</span>
					</div>
				)
			})}
		</div>
	);
};