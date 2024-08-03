import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './input.css';
import LanguageSelector from "./LanguageSelector";
export default function InputPage() {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [showdigits, setshowdigits] = useState(false);
  const [langId, setLangId] = useState('fr');
  const [langcode, setLangcode] = useState('fr-FR');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    showdigits ? navigate(`/number?langId=${langId}&langCode=${langcode}&min=${min}&max=${max}`) : navigate(`/text?langId=${langId}&langCode=${langcode}&min=${min}&max=${max}`) ;
  };
  const handleCheckboxChange = () => {
    setshowdigits(!showdigits);
  };
  return (
    <div className="input-container">
      <h1>Arqam</h1>
      <LanguageSelector onLanguageSelect={(lang)=>{setLangId(lang.id);setLangcode(lang.code)}}/>
      <h2>Enter Min and Max Values</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__group field">
          <input value={min}
            onChange={(e) => setMin(e.target.value)} type="number" className="form__field" placeholder="Min" name="min" id='min' required />
          <label htmlFor="min" className="form__label">Min</label>
        </div>
        <div className="form__group field">
          <input value={max}
            onChange={(e) => setMax(e.target.value)} type="number" className="form__field" placeholder="Max" name="max" id='max' required />
          <label htmlFor="max" className="form__label">Max</label>
        </div>
        <div className="checkbox-container">
          <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={showdigits}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
            Train with digits
          </label>
          <p className="checkbox-status">
            Showing {showdigits ? 'digits' : 'text'}.
          </p>
        </div>
        <div className="form-div">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
