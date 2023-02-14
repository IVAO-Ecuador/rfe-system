import { useEffect } from "react";
import { createContext, useState } from "react";
import { LoginSection } from "../../auth/pages/LoginSection";
import { LanguageSelector } from "../components/LanguageSelector";
import { RFOPage } from "../components/RFOPage";
import { translations } from "../translate/translations";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export const PageContext = createContext(null);

export const HomePage = () => {

	const [selectedLanguage, setSelectedLanguage] = useState('Español');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userLogged, setUserLogged] = useState();
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const handleLanguageSelection = (language) => {
		setSelectedLanguage(language);
	};

	const handleSession = (isOnSession, { vid, firstname, lastname }) => {
		setUserLogged([{ vid: vid, firstname: firstname, lastname: lastname }]);
		setIsLoggedIn(isOnSession);
		toggleSidebar(false)
	}

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	}

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1180 && isLoggedIn) {
				setSidebarOpen(true);
			}
			if (window.innerWidth > 1180 && isLoggedIn) {
				setSidebarOpen(false);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<PageContext.Provider value={{ selectedLanguage, userLogged, sidebarOpen }}>
			<div className="xl:min-h-screen w-full lg:flex">

				{/** Menu lateral */}
				<div className={`lg:w-1/3  bg-bg-dark-purple py-12 px-16 ${!sidebarOpen ? 'lg:w-1/12 lg:py-16 lg:px-8' : ''}`}>
					<div className="lg:block flex items-center gap-x-14 max-md:block">
						<img src="http://rfo.ec.ivao.aero/assets/ec_logo-ea67a782.png" alt="Logo IVAO Ecuador" className="block lg:m-auto lg:mb-5 max-md:mb-5 max-md:mb-5 lg:w-96 w-56" />
						<div className="lg:text-center text-left">
							<h1 className={`text-4xl lg:mb-10 mb-5 font-bold text-white font-[Poppins] ${!sidebarOpen ? 'lg:hidden' : ''}`}>RFO System</h1>
							<p className={`text-lg font-[Poppins] text-white lg:mb-12 ${!sidebarOpen ? 'lg:hidden' : ''}`}>{translations[selectedLanguage].description}</p>
						</div>
					</div>

					<div className={`lg:block flex justify-center items-center flex-wrap gap-x-8 gap-y-5 ${!sidebarOpen ? 'mt-16' : 'mt-10'}`}>
						<div className={`flex justify-center lg:ml-0 ${!sidebarOpen ? 'lg:mt-5 ' : 'lg:mt-10'}`}>
							<a  id={!sidebarOpen ? 'tooltip_website' : ''} href="https://ec.ivao.aero/" target='blank' className={`${!sidebarOpen ? 'px-8' : 'px-10'} flex bg-purple margin-auto py-3 rounded-xl justify-center relative text-white font-medium text-lg`}>
								{!sidebarOpen ? <i className="bi bi-globe-americas"></i> : <p className="text-center">{translations[selectedLanguage].button_label}</p>}
							</a>
						</div>
						
						<div id={!sidebarOpen ? 'tooltip_languages' : ''} className={`flex justify-center lg:ml-0 ${!sidebarOpen ? 'lg:mt-5 ' : 'lg:mt-10'}`}>
							<LanguageSelector onNewLanguage={handleLanguageSelection} />
						</div>
					</div>
				</div>

				{!isLoggedIn ? (
					<div className="lg:w-2/3 px-12 py-12 max-md:px-10 bg-bg-dark-blue flex items-center justify-center login-section">
						<LoginSection onChangeSession={handleSession} />
					</div>
				) : (
					<div className={`xl:w-2/3 p-16 bg-bg-dark-blue ${!sidebarOpen ? 'xl:w-11/12' : ''}`}>
						<RFOPage />
					</div>
				)}
			</div>

			<ReactTooltip
                anchorId="tooltip_website"
                place="right"
                content= {translations[selectedLanguage].button_label}
            />

			<ReactTooltip
				anchorId="tooltip_languages"
				place="right"
				content={translations[selectedLanguage].tooltip_language}
			/>

		</PageContext.Provider>
	)
}


