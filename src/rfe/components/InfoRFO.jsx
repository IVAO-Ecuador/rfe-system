import {useContext} from 'react'

export const InfoRFO = () => {

    const language = useContext(PageContext);

  return (
    <>
        <img src={souce}/>
        <h2>{translations[selectedLanguage].rfo_title}</h2>
        <p>{translations[selectedLanguage].rfo_description}</p>

        <div className='w-full h-10'>

        </div>
    </>
  )
}
