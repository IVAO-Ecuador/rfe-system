import { useContext, useState, useEffect } from "react"
import { PageContext } from "../../rfe/pages/HomePage"
import { translations } from "../../rfe/translate/translations"

export const LoginSection = ({ onChangeSession }) => {

	const [token, setToken] = useState(null);
	const { selectedLanguage, userLogged } = useContext(PageContext);

	useEffect(() => {
		const tokenFromUrl = new URL(window.location.href).searchParams.get('IVAOTOKEN');
		if (tokenFromUrl) {
			setToken(tokenFromUrl);
			fetchData(tokenFromUrl);
			history.replaceState({}, '', window.location.pathname);
		}
	}, []);

	const fetchData = async (token) => {
		try {
			const response = await fetch(`https://login.ivao.aero/api.php?type=json&token=${token}`);
			const data = await response.json();

			const data2 = {
				vid2 : "625219",
		 		firstname2: "Santiago",
				lastname2: "Baron",
			}
			onChangeSession(true, data2)
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="p-12 max-md:p-8 max-md:py-16 rounded-2xl text-center bg-purple-login w-[580px] h-[auto] login-bg relative">
			<h2 className="text-[27px] font-bold text-gray-lighter mb-7">{translations[selectedLanguage].login_title}</h2>
			<p className="text-gray-lighter m-5">{translations[selectedLanguage].login_subtitle}</p>
			<a href="https://login.ivao.aero/index.php?url=http://rfo.ec.ivao.aero" className="w-full block text-white py-5 bg-purple-button rounded-xl relative mb-6 flex justify-center items-center">
				<img src="/src/assets/ivao_official.png" className="w-8 mr-3" />
				{translations[selectedLanguage].login_button}
			</a>
			<a className="text-white" href="https://ivao.aero/members/person/register.htm">{translations[selectedLanguage].login_signup}</a>
		</div>
	)
}