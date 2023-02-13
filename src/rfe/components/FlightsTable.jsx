import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { PageContext } from '../pages/HomePage';
import { translations } from '../translate/translations';

export const FlightsTable = () => {

	const { selectedLanguage, userLogged } = useContext(PageContext);
	const [flightsInfo, setFlightsInfo] = useState([]);
	const [selectAirport, setSelectAirport] = useState("SEQM")
	const [type, setType] = useState("Departures")

	const handleSelectAirport = ( airport ) => {
		setSelectAirport(airport)
	}

	const handleType = ( type ) => {
		setType(type)
	}

	useEffect(() => {
		async function fetchData() {
		  const response = await fetch("http://localhost:2020/api/flights");
		  const result = await response.json();
		  setFlightsInfo(result);
		  console.log(result)
		}
		fetchData();
	  }, []);

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
					<li className={`${type === "Departures" ? "active_section" : "deactived_section"} md:w-1/2 py-4 cursor-pointer text-white flex items-center justify-center gap-3`}
					onClick={() => {handleType("Departures")}}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
							<path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
						</svg>
						<p>{translations[selectedLanguage].departures}</p>
					</li>
					<li className={`${type === "Arrivals" ? "active_section" : "deactived_section"} md:w-1/2 py-4 cursor-pointer text-white flex items-center justify-center gap-3`}
					onClick={() => {handleType("Arrivals")}}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
							<path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
						</svg>
						<p>{translations[selectedLanguage].arrivals}</p>
					</li>
				</ul>
			</div>
		</div>
	  );
}
