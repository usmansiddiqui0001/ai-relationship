
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex flex-col items-center text-center">
      <h1 
        className="text-4xl font-bold text-[#d6336c]"
      >
        AI Relationship Fixer 💞
      </h1>
      <p className="mt-2 text-xl text-gray-700 max-w-2xl">
        Craft the perfect message to mend hearts and rebuild connections.<br />Let our AI help you find the right words.
      </p>
    </header>
  );
};

export default Header;
