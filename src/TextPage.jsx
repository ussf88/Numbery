import React, { useState, useEffect } from "react";
import writtenNumber from "written-number";
import { useSearchParams, useNavigate } from "react-router-dom";
import { speak } from "./speak";
import "./number.css";
export default function TextPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const min = parseInt(searchParams.get("min"));
  const max = parseInt(searchParams.get("max"));
  const [number, setNumber] = useState(null);
  const [result, setResult] = useState('');
  const [resultClassName, setresultClassName] = useState('result')

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const generateRandomNumber = () => {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    while(randomNum==number) randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setNumber(randomNum);
  };
  const handleClick = (value) => {
    if (value === 'backspace') {
        setResult(result.slice(0, -1));
    } else if (value === 'enter') {
        if(isCorrect()){
            generateRandomNumber();
            setResult('');
            setresultClassName('result');
        }else{
            speak(writtenNumber(number, { lang: "fr" }));
            setResult('');
           setresultClassName('result'+(result !='' && result!=null? ' wrong': ''))
        }
     
    } else {
        setResult(res =>res + value);
    }
};
const isCorrect = ()=> parseInt(result)==number;
  useEffect(() => {
    if (number != null) speak(writtenNumber(number, { lang: "fr" }));
  }, [number]);

  return (
    <div className="number-container">
      <h1></h1>


      <div className={resultClassName} id="result">{result}</div>

   
      <div class="numpad">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                    <button
                        key={num}
                        className="number"
                        value={num}
                        onClick={() => handleClick(num.toString())}
                    >
                        {num}
                    </button>
                ))}

        <button  className="action"
                    id="backspace"
                    value="backspace"
                    onClick={() => handleClick('backspace')}>&#9003;</button>
        <button      className="action"
                    id="enter"
                    value="enter"
                    onClick={() => handleClick('enter')}>Enter</button>
    </div>
      <button className="go-back-button" onClick={() => navigate("/")}>
        Go Back
      </button>
    </div>
  );
}
