import React from 'react';
import './LanguageToggle.css';

const LanguageToggle = ({ language, toggleLanguage }) => {
  return (
    <div className="shiva-language-toggle">
      <button 
        onClick={toggleLanguage}
        className={`shiva-language-button ${language === 'en' ? 'active' : ''}`}
      >
        English
      </button>
      <button 
        onClick={toggleLanguage}
        className={`shiva-language-button ${language === 'hi' ? 'active' : ''}`}
      >
        हिंदी
      </button>
    </div>
  );
};

export default LanguageToggle;