import {useContext} from 'react'
import { PageContext } from '../pages/HomePage';
import { FlightsTable } from './FlightsTable';
import { InfoRFO } from './InfoRFO';

export const RFOPage = () => {

  return (
    <div className='lg:p-5'>
        <InfoRFO/>
        <FlightsTable/>
    </div>
  )
}
