import React, { useState, useEffect } from 'react';
import writtenNumber from 'written-number';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { speak } from './speak';
import './number.css'
export default function NumberPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const min = parseInt(searchParams.get('min'));
    const max = parseInt(searchParams.get('max'));
    const langId = searchParams.get("langId") ?? 'en';
    const langCode = searchParams.get("langCode") ?? 'en-US';
    const [number, setNumber] = useState(null);
    const [showWritten, setShowWritten] = useState(false);
    const [count, setCount] = useState(0);
    const dateKey = 'number-date';
  const countKey = 'number-count';
  useEffect(() => {
     // Load data from localStorage
     const storedDate = localStorage.getItem(dateKey);
     const storedCount = localStorage.getItem(countKey);
     const today = new Date().toLocaleDateString();

     if (storedDate === today) {
         setCount(parseInt(storedCount, 10) || 0);
     } else {
         // Reset the count if the date has changed
         localStorage.setItem(dateKey, today);
         localStorage.setItem(countKey, 0);
         setCount(0);
     }
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
            const newCount = count  + 1;
            setCount(c=>c+1);
            localStorage.setItem(countKey,newCount);
            setShowWritten(true);
            const writtenText = writtenNumber(number, { lang: langId });
            speak(writtenText,langCode);
        }
    };
    return (
        <div className="number-container">
                <h1>{number}</h1>
                
                <div className='number-text-container'>{showWritten && <p className='number-text'>{writtenNumber(number, { lang: langId })}</p>}</div>
                <button onClick={handleRevealClick}>
                    {showWritten ? 'Next' : 'Reveal'}
                </button>
            <button className="go-back-button" onClick={() => navigate('/')}>Go Back</button>
            <div className="progress">Today's count: {count}</div>
        </div>
        
    );
}
