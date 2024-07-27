// src/utils/speak.js
export const speak = (text) => {
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'fr-FR'; // Set the language to French
        window.speechSynthesis.speak(speech);
    } else {
        alert('Sorry, your browser does not support speech synthesis.');
    }
};
