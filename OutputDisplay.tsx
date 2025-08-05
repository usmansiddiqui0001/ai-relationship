
import React from 'react';
import PulsingHeartsLoader from './LoadingSpinner';
import { getContrastingTextColor } from '../utils/colorUtils';
import { DEFAULT_COLORS } from '../constants';

interface OutputDisplayProps {
  message: string | null;
  isLoading: boolean;
  error: string | null;
  colors: {
    background: string;
  };
  isVisible: boolean;
  onReset: () => void;
}

const SampleMessage: React.FC = () => {
    const sampleColors = DEFAULT_COLORS;
    const style: React.CSSProperties = {
        padding: '2rem',
        backgroundColor: sampleColors.background,
        color: getContrastingTextColor(sampleColors.background),
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    };
    return (
        <div style={style}>
            <p className="mb-4">My love ❤️,</p>
            <p className="mb-4">I can’t express how sorry I am for forgetting such an important day. It was a terrible mistake, and I deeply regret it 😔.</p>
            <p>You mean the world to me. Please allow me to make it up to you 💐.</p>
        </div>
    );
};


const OutputDisplay: React.FC<OutputDisplayProps> = ({ message, isLoading, error, colors, isVisible, onReset }) => {
  const containerStyle: React.CSSProperties = {
    padding: '2rem',
    backgroundColor: colors.background,
    color: getContrastingTextColor(colors.background),
    minHeight: '300px',
    borderRadius: '1rem',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  };

  const renderContent = () => {
    if (isLoading && !message) {
      return (
        <div className="flex items-center justify-center min-h-[300px]">
            <PulsingHeartsLoader />
        </div>
      );
    }
    if (error) {
       return <div className="text-red-900 bg-red-100 p-6 rounded-xl border-2 border-red-200 font-semibold shadow-md">{error}</div>;
    }
    if (message) {
      return (
        <div style={containerStyle}>
            <div dangerouslySetInnerHTML={{ __html: message }} className="space-y-4" />
        </div>
      );
    }
    return (
      <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="text-center text-gray-600 italic p-4 -mt-4 mb-4">
            <p className="text-md font-medium">Your personalized message will appear here. Here's an example:</p>
        </div>
        <div>
            <SampleMessage/>
        </div>
      </div>
    );
  };
  
  const animationClass = isVisible ? 'animate-slide-in-right' : 'animate-slide-out-left';

  return (
    <div className={`w-full ${animationClass}`}>
        <h2 className="text-3xl font-bold text-rose-800 mb-6 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>Generated Message</h2>
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
         {renderContent()}
        </div>
       {!isLoading && (
            <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <button
                    type="button"
                    onClick={onReset}
                    className="bg-white text-rose-800 font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-rose-100 transition-all transform hover:scale-105 border-2 border-rose-200"
                >
                    Create Another Message ✍️
                </button>
            </div>
        )}
    </div>
  );
};

export default OutputDisplay;