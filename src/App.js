import React from 'react';
import Near_String from './near_string_.png';
import './App.css';

function App() {
  return (
      <header className="flex justify-center flex-col items-center min-h-screen text-lg font-mono">
        <img src={Near_String} className="h-60 mb-8" alt="Icon" />
        <p className=" text-blueGray-800 text-3xl">This is pwa CRA template with Tailwindcss. </p>
      </header>
  );
}

export default App;
