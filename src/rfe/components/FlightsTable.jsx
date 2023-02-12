import React from 'react'
import { useContext } from 'react';
import { PageContext } from '../pages/HomePage';

export const FlightsTable = () => {

    const { selectedLanguage, userLogged } = useContext(PageContext);

  return (
    <div>FlightsTable</div>
  )
}
