import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import InputPage from './InputPage';
import NumberPage from './NumberPage';
import TextPage from './TextPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <Routes>
            <Route path="/" element={<InputPage />} />
            <Route path="/number" element={<NumberPage />} />
            <Route path="/text" element={<TextPage />} />
        </Routes>
    </Router>
);
}

export default App
