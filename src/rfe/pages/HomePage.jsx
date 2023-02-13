import { createContext, useState } from "react";
import { LoginSection } from "../../auth/pages/LoginSection";
import { LanguageSelector } from "../components/LanguageSelector";
import { RFOPage } from "../components/RFOPage";
import { translations } from "../translate/translations";

export const PageContext = createContext(null);

export const HomePage = () => {

	const [selectedLanguage, setSelectedLanguage] = useState('Español');
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [userLogged, setUserLogged] = useState([{ vid: "625219", firstname: "Santiago", lastname: "Baron" }]);

	const handleLanguageSelection = ( language ) => {
        setSelectedLanguage( language );
    };


	const handleSession = ( isOnSession, { vid, firstname, lastname }) => {
		setUserLogged([{ vid: vid, firstname: firstname, lastname: lastname }]);
		setIsLoggedIn( isOnSession );
	}

	return (
		<PageContext.Provider value={{selectedLanguage, userLogged}}>
		<div className="xl:min-h-screen w-full lg:flex">
			<div className="lg:w-1/3 p-12 px-16 bg-bg-dark-purple">
				<div className="lg:block flex items-center gap-x-14 max-md:block">
					<img src="http://rfo.ec.ivao.aero/assets/ec_logo-ea67a782.png" alt="Logo IVAO Ecuador" className="block lg:m-auto lg:mb-5 max-md:mb-5 max-md:mb-5 lg:w-96 w-56" />
					<div className="lg:text-center text-left">
						<h1 className="text-4xl lg:mb-10 mb-5 font-bold text-white font-[Poppins]">RFO System</h1>
						<p className="text-lg font-[Poppins] text-white lg:mb-12">{translations[selectedLanguage].description}</p>
					</div>
				</div>

				<div className="lg:block flex justify-center items-center lg:mt-0 mt-10 flex-wrap gap-x-8 gap-y-5">
					<a href="https://ec.ivao.aero/" target='blank' className="flex bg-purple margin-auto px-10 py-3 rounded-xl justify-center relative text-white font-medium text-lg">
						<p className="text-center">{translations[selectedLanguage].button_label}</p>
					</a>
					<div className="flex justify-center lg:mt-10 lg:ml-0">
						<LanguageSelector onNewLanguage={ handleLanguageSelection }/>
					</div>
				</div>
			</div>

			{!isLoggedIn ? (
				<div className="lg:w-2/3 px-12 py-12 max-md:px-10 bg-bg-dark-blue flex items-center justify-center login-section">
					<LoginSection onChangeSession={handleSession} />
				</div>
			) : (
				<div className="xl:w-2/3 p-16 bg-bg-dark-blue">
					<RFOPage/>
				</div>
			)}
		</div>
		</PageContext.Provider>
	)
}


