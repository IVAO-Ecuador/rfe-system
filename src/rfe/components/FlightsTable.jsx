import React, { createContext, useState } from 'react'
import { useContext } from 'react';
import { PageContext } from '../pages/HomePage';
import { translations } from '../translate/translations';
import { FlightsItems } from './FlightsItems';

export const FlightsList = createContext();

export const FlightsTable = () => {

	const { selectedLanguage, userLogged } = useContext(PageContext);
	const [selectAirport, setSelectAirport] = useState("SEQM")
	const [type, setType] = useState("Departures")

	const handleSelectAirport = ( airport ) => {
		setSelectAirport(airport)
	}

	const handleType = ( type ) => {
		setType(type)
	}

	  return (
		<div>
			<ul className='md:flex block mb-5'>
				<li className={`${selectAirport === "SEQM" ? "bg-blue" : "bg-bg-dark-purple"} md:w-1/2 w-full py-4 font-light md:rounded-l-md md:rounded-r-none rounded-md md:mb-0 mb-3 max-md:px-5 cursor-pointer text-center text-white`} 
					onClick={() => handleSelectAirport("SEQM")}>
					SEQM - Mariscal Sucre Intl.
				</li>
				<li className={`${selectAirport === "SEGU" ? "bg-blue" : "bg-bg-dark-purple"} md:w-1/2 w-full py-4 font-light md:rounded-r-md md:rounded-l-none rounded-md md:mb-0 mb-3 max-md:px-5 cursor-pointer text-center text-white`} 
					onClick={() => handleSelectAirport("SEGU")}>
					SEGU - José Joaquín de Olmedo Intl.
				</li>
			</ul>
			<div>
				<ul className="flex">
					<li className={`${type === "Departures" ? "active_section" : "deactived_section"} md:w-1/2 w-full py-4 cursor-pointer text-white flex items-center justify-center gap-3`}
					onClick={() => {handleType("Departures")}}>
						<i className="bi bi-arrow-up-right-square-fill"></i>
						<p>{translations[selectedLanguage].departures}</p>
					</li>
					<li className={`${type === "Arrivals" ? "active_section" : "deactived_section"} md:w-1/2 w-full py-4 cursor-pointer text-white flex items-center justify-center gap-3`}
					onClick={() => {handleType("Arrivals")}}>
						<i className="bi bi-arrow-down-right-square-fill"></i>
						<p>{translations[selectedLanguage].arrivals}</p>
					</li>
				</ul>
			</div>
			<div className='mt-10'>
				<FlightsList.Provider value={{ selectAirport, type }}>
					<FlightsItems/>
				</FlightsList.Provider>
			</div>
		</div>
	  );
}
