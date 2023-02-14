import React, { useState, useContext } from 'react';
import { PageContext } from '../pages/HomePage';
import { translations } from '../translate/translations';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export const LanguageSelector = ({ onNewLanguage }) => {

    const [isOpen, setIsOpen] = useState(false);
    const { selectedLanguage, sidebarOpen } = useContext(PageContext);
    
    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (language) => {
        onNewLanguage(language)
        setIsOpen(false);
    }

    const handleCloseLanguages = (event) => {
        if (!event.target.closest('.language-selector') && !event.target.closest('.language-selector button')) {
            setIsOpen(false);
        }
    };
    
    React.useEffect(() => {
        document.addEventListener('mousedown', handleCloseLanguages);
        return () => {
            document.removeEventListener('mousedown', handleCloseLanguages);
        };
    });

    return (
        <div className="relative">
            <button className={`flex items-center focus:outline-none bg-light-blue px-16 py-3 rounded-lg ${!sidebarOpen ? 'px-8' : ''}`} >
                <i className='bi bi-translate text-white text-[18px]'></i>
                {!sidebarOpen ?  "" : <p className='text-bg-gray font-semibold ml-3'>{translations[selectedLanguage].language}</p>}
                
            </button>
            {isOpen && (
                <div className="language-selector absolute right- bottom-0 bg-light-blue flex w-full h-full rounded-lg shadow-xl">
                    <button className="block w-full px-4 py-2 text-white hover:bg-gray-200 text-center font-semibold border-r-light-blue-2 border-r-2" onClick={() => handleChange('English')}>
                        English
                    </button>
                    <button className="block w-full px-4 py-2 text-white hover:bg-gray-200 text-center font-semibold" onClick={() => handleChange('Español')}>
                        Español
                    </button>
                </div>
            )}
        </div>
    );
};