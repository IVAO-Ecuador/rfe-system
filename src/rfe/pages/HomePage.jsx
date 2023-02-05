import { createContext, useContext } from "react";
import { LanguageContext, LanguageSelector } from "../components/LanguageSelector";

export const HomePage = () => {

	const lenguaje = useContext(LanguageContext);
	

	return (
		
		<div className="h-screen w-full flex">
			<div className="w-1/3 p-12 px-16 bg-bg-dark-purple">
				<img src="./src/assets/ec_logo.png" alt="Logo IVAO Ecuador" className="block m-auto mb-5 w-96" />
				<h1 className="text-center text-4xl mb-10 font-bold text-white font-[Poppins]">RFE System</h1>

				<p className="text-center text-lg font-[Poppins] text-white mb-12">
				</p>

				<div className="flex justify-center mb-10">
					<a href="https://ec.ivao.aero/" target='blank' className="bg-purple margin-auto px-20 py-3 rounded-full relative text-white font-semibold text-lg button-hp">Ir al sitio oficial de IVAO Ecuador</a>
				</div>

				<div className="flex justify-center">
					<LanguageSelector/>
				</div>
			</div>

			<div className="w-2/3 p-12 bg-bg-dark-blue">

			</div>
		</div>
		
	)
}


