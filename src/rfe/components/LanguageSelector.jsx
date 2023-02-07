import React, { useState, useContext } from 'react';
import { PageContext } from '../pages/HomePage';
import { translations } from '../translate/translations';

export const LanguageSelector = ({ onNewLanguage }) => {

    const [isOpen, setIsOpen] = useState(false);
    const { selectedLanguage, userLogged } = useContext(PageContext);
    
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
            <button className="flex items-center focus:outline-none bg-light-blue px-16 py-3 rounded-lg" onClick={handleOpen}>
                <svg className="h-5 w-5 mr-2 text-bg-gray" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                    <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
                </svg>
                <p className='text-bg-gray font-semibold'>{translations[selectedLanguage].language}</p>
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