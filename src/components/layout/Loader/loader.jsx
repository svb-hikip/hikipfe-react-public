import React from 'react';

const quotes = [
  "Loading some awesome data!",
  "Hang tight, we're fetching your information!",
  "The magic is happening, please wait!",
  "Just a moment, we're preparing something special for you!",
];

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const Loader = () => (
  <div className="flex items-center justify-center flex-col p-5 bg-gray-100 rounded-lg shadow-md">
    <div className="border-4 border-solid border-transparent rounded-full w-10 h-10 border-blue-500 animate-spin" style={{ borderLeftColor: '#3498db' }}></div>
    <div className="mt-5 text-base italic text-gray-700">{getRandomQuote()}</div>
  </div>
);

export default Loader;
