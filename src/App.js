import React from 'react';
import Near_String from './near_string_.png';

function App() {
  return (
      <div className="flex flex-col justify-center items-center min-h-screen text-lg font-mono">
        <img src={Near_String} className="h-60 mb-8" alt="Icon" />
        <p className=" text-blueGray-800 text-3xl">This is pwa CRA template with Tailwindcss.</p>
      </div>
  );
}

export default App;
