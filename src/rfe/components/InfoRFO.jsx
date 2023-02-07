import {useContext} from 'react'
import { PageContext } from '../pages/HomePage';

export const InfoRFO = () => {

  const { selectedLanguage, userLogged } = useContext(PageContext);
  
  const userInfo = userLogged[0];

  return (
    <>
        <p>El lenguaje es {selectedLanguage}</p>
        <p>El usuario es {userInfo.vid}</p>
    </>
  )
}
