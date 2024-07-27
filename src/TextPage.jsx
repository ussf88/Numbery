import React, { useState, useEffect } from 'react';
import writtenNumber from 'written-number';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { speak } from './speak';
import './number.css'
export default function TextPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const min = parseInt(searchParams.get('min'));
    const max = parseInt(searchParams.get('max'));
    const [number, setNumber] = useState(null);
    const [showWritten, setShowWritten] = useState(false);

    useEffect(() => {
        generateRandomNumber();
    }, []);

    const generateRandomNumber = () => {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        setNumber(randomNum);
        setShowWritten(false);
    };
    const handleRevealClick = () => {
        if (showWritten) {
            generateRandomNumber();
        } else {
            setShowWritten(true);
            const writtenText = writtenNumber(number, { lang: 'fr' });
            speak(writtenText);
        }
    };
    return (
        <div className="number-container">
                <h1>{writtenNumber(number, { lang: 'fr' })}</h1>
                
                <div className='number-text-container'>{showWritten && <p className='number-text'>{number}</p>}</div>
                <button onClick={handleRevealClick}>
                    {showWritten ? 'Next' : 'Reveal'}
                </button>
            <button className="go-back-button" onClick={() => navigate('/')}>Go Back</button>
        </div>
    );
}
