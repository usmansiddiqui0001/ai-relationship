
import React from 'react';

const PulsingHeartsLoader: React.FC = () => {
  const heartStyle = "w-10 h-10 bg-rose-500 rounded-full";
  
  return (
    <div className="flex justify-center items-center p-8 space-x-2">
      <div 
        className={`${heartStyle} animate-pulse`} 
        style={{ animationDelay: '0s' }}
      />
      <div 
        className={`${heartStyle} animate-pulse`} 
        style={{ animationDelay: '0.2s' }}
      />
      <div 
        className={`${heartStyle} animate-pulse`} 
        style={{ animationDelay: '0.4s' }}
      />
    </div>
  );
};

export default PulsingHeartsLoader;