import React, { useState } from 'react';
import './LanguageSelector.css';

const languages = [
  { name: 'English', id: 'en', code: 'en-US' },
  { name: 'Portuguese (Brazil)', id: 'pt', code: 'pt-BR' },
  { name: 'Portuguese (Portugal)', id: 'ptPT', code: 'pt-PT' },
  { name: 'Spanish', id: 'es', code: 'es-ES' },
  { name: 'French', id: 'fr', code: 'fr-FR' },
  { name: 'Esperanto', id: 'eo', code: 'eo' },
  { name: 'Vietnamese', id: 'vi', code: 'vi-VN' },
  { name: 'Arabic', id: 'ar', code: 'ar-SA' },
  { name: 'Azerbaijan', id: 'az', code: 'az-AZ' },
  { name: 'Turkish', id: 'tr', code: 'tr-TR' },
  { name: 'English (Indian)', id: 'enIndian', code: 'en-IN' },
  { name: 'Ukrainian', id: 'uk', code: 'uk-UA' },
  { name: 'Indonesian', id: 'id', code: 'id-ID' },
  { name: 'Russian', id: 'ru', code: 'ru-RU' },
];

const LanguageSelector = ({ onLanguageSelect }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleChange = (event) => {
    const selectedLang = event.target.value;
    setSelectedLanguage(selectedLang);
    const language = languages.find(lang => lang.id === selectedLang);
    onLanguageSelect({ id: selectedLang, code: language.code });
  };

  return (
    <div className="language-selector">
      <select value={selectedLanguage} onChange={handleChange} className="language-dropdown">
        <option value="" disabled>Select a language</option>
        {languages.map((language) => (
          <option key={language.id} value={language.id}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
