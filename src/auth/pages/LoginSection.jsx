import { useContext } from "react"
import { PageContext } from "../../rfe/pages/HomePage"
import { translations } from "../../rfe/translate/translations"

export const LoginSection = () => {

  const language = useContext(PageContext)

  return (
    <div className="p-12 rounded-2xl text-center bg-purple-login w-[580px] h-[auto] login-bg relative">
        <h2 className="text-[27px] font-bold text-gray-lighter mb-7">{translations[language].login_title}</h2>
        <p className="text-gray-lighter m-5">{translations[language].login_subtitle}</p>
        <button className="w-full text-white py-5 bg-purple-button rounded-xl button-login relative pl-20 mb-6">{translations[language].login_button}</button>
        <a className="text-white" href="https://ivao.aero/members/person/register.htm">{translations[language].login_signup}</a>
    </div>
  )
}