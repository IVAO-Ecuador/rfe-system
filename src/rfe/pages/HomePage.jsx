import { createContext, useState } from "react";
import { LoginSection } from "../../auth/pages/LoginSection";
import { LanguageSelector } from "../components/LanguageSelector";
import { RFOPage } from "../components/RFOPage";
import { translations } from "../translate/translations";

export const PageContext = createContext(null);

export const HomePage = () => {

	const [selectedLanguage, setSelectedLanguage] = useState('Español');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userLogged, setUserLogged] = useState([]);

	const handleLanguageSelection = ( language ) => {
        setSelectedLanguage( language );
    };


	const handleSession = ( isOnSession, { vid, firstname, lastname }) => {
		setIsLoggedIn( isOnSession );
		setUserLogged([{ vid: vid, firstname: firstname, lastname: lastname }]);
	}

	return (
		<PageContext.Provider value={{selectedLanguage, userLogged}}>
		<div className="xl:min-h-screen w-full xl:flex">
			<div className="xl:w-1/3 p-12 px-16 bg-bg-dark-purple">
				<img src="http://rfo.ec.ivao.aero/assets/ec_logo-ea67a782.png" alt="Logo IVAO Ecuador" className="block m-auto mb-5 w-96" />
				<h1 className="text-center text-4xl mb-10 font-bold text-white font-[Poppins]">RFE System</h1>

				<p className="text-center text-lg font-[Poppins] text-white mb-12">
					{translations[selectedLanguage].description}
				</p>

				<div className="flex justify-center mb-10">
					<a href="https://ec.ivao.aero/" target='blank' className="bg-purple margin-auto px-20 py-3 rounded-full relative text-white font-medium text-lg button-hp">
						{translations[selectedLanguage].button_label}
					</a>
				</div>

				<div className="flex justify-center">
					<LanguageSelector onNewLanguage={ handleLanguageSelection }/>
				</div>
			</div>

			{!isLoggedIn ? (
				<div className="xl:w-2/3 p-12 bg-bg-dark-blue flex items-center justify-center login-section">
					<LoginSection onChangeSession={handleSession} />
				</div>
			) : (
				<div className="xl:w-2/3 p-12 bg-bg-dark-blue">
					<RFOPage/>
				</div>
			)}
			
		</div>
		</PageContext.Provider>
	)
}


