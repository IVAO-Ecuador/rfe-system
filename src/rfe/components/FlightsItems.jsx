import React, { useContext, useEffect, useState } from 'react';
import { FlightsList } from './FlightsTable';

export const FlightsItems = () => {
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
		<div className='flex justify-between bg-bg-dark-purple px-10 py-5 rounded-md text-white mb-4'>
			<span className="w-1/5">Flight</span>
			<span className="w-1/3">Destination Airport</span>
			<span className="w-1/5">Departure time</span>
			<span className="w-1/5">Aircraft</span>
			<span className="w-1/5">Status</span>
		</div>
		{ flightsInfo.map( (flight) => {
			return(
				<div className='md:flex md:justify-between bg-bg-dark-purple px-10 py-5 rounded-md text-white'>
					<span className="w-1/5">{flight.numeroVuelo}</span>
					<span className="w-1/3">{flight.ICAO_Llegada} - {flight.aeropuertoLlegada}</span>
					<span className="w-1/5">{flight.horaSalida}</span>
					<span className="w-1/5">{flight.tipoAeronave}</span>
					<span className="w-1/5">{flight.estatus}</span>
				</div>
			)
		})}
  	</div>
  );

};