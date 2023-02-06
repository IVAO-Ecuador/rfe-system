import { useContext, useState, useEffect } from "react"
import { PageContext } from "../../rfe/pages/HomePage"
import { translations } from "../../rfe/translate/translations"

export const LoginSection = ({ onChangeSession }) => {

	const [token, setToken] = useState(null);
	const language = useContext(PageContext)

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
			onChangeSession(true)
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="p-12 rounded-2xl text-center bg-purple-login w-[580px] h-[auto] login-bg relative">
			<h2 className="text-[27px] font-bold text-gray-lighter mb-7">{translations[language].login_title}</h2>
			<p className="text-gray-lighter m-5">{translations[language].login_subtitle}</p>
			<a href="https://login.ivao.aero/index.php?url=http://rfo.ec.ivao.aero" className="w-full block text-white py-5 bg-purple-button rounded-xl button-login relative pl-20 mb-6">{translations[language].login_button}</a>
			<a className="text-white" href="https://ivao.aero/members/person/register.htm">{translations[language].login_signup}</a>
		</div>
	)
}