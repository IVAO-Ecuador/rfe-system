import {useContext} from 'react'
import { InfoRFO } from './InfoRFO';

export const RFOPage = () => {

    const language = useContext(PageContext);

  return (
    <>
        <InfoRFO/>
        
    </>
  )
}
