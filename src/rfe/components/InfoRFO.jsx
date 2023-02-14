import React, { useState, useEffect, useContext } from 'react';
import { getStatistics } from '../helpers/getStatistics';
import { PageContext } from '../pages/HomePage';
import { translations } from '../translate/translations';

export const InfoRFO = () => {
	const counts = { Libre: 0, Reservado: 0, Confirmado: 0 };
	const [statistics, setStatistics] = useState(null);
	const { selectedLanguage, userLogged } = useContext(PageContext);
	const userInfo = userLogged[0];

	useEffect(() => {
		const fetchData = async () => {
			const stats = await getStatistics();
			setStatistics(stats);
		};
		fetchData();
	}, []);

	if (statistics != null) {
		for (let i = 0; i < statistics.length; i++) {
			counts[statistics[i].estado] += statistics[i].cantidad;
		}
	}

	return (
		<div className='mb-10'>
			<div className='max-w-5xl mb-8'>
				<h2 className='text-white font-semibold text-2xl mb-3'>{translations[selectedLanguage].greeting} {userInfo.firstname}, {translations[selectedLanguage].rfo_title}</h2>
				<p className='text-gray'>{translations[selectedLanguage].rfo_description}</p>
			</div>

			{!statistics ? (
				<div className="">
					...
				</div>
			) : (
				<div className='md:flex lg:gap-5 gap-4'>
					<p className='lg:w-1/3 w-full max-md:mb-3 bg-green p-3 text-center rounded-md text-white'>{translations[selectedLanguage].rfo_available} <span>{counts.Libre}</span></p>
					<p className='lg:w-1/3 w-full max-md:mb-3 bg-yellow p-3 text-center rounded-md text-white'>{translations[selectedLanguage].rfo_waitingConfirmation} <span>{counts.Reservado}</span></p>
					<p className='lg:w-1/3 w-full max-md:mb-3 bg-red p-3 text-center rounded-md text-white'>{translations[selectedLanguage].rfo_booked} <span>{counts.Confirmado}</span></p>
				</div>
			)}


		</div>
	)
}
