
import React, { useState } from 'react';
import { Topic, FormData, Mood, Relationship } from '../types';
import { TOPIC_OPTIONS, DEFAULT_COLORS, LANGUAGE_OPTIONS, MOOD_OPTIONS, RELATIONSHIP_OPTIONS } from '../constants';
import { getContrastingTextColor } from '../utils/colorUtils';

interface FormAndOutputProps {
  onSubmit: (data: FormData) => void;
  onReset: () => void;
  isLoading: boolean;
  message: string | null;
  error: string | null;
}

const InputForm: React.FC<FormAndOutputProps> = ({ onSubmit, onReset, isLoading, message, error }) => {
  const [relationship, setRelationship] = useState<Relationship>(Relationship.Girlfriend);
  const [mood, setMood] = useState<Mood>(Mood.Angry);
  const [mistake, setMistake] = useState('');
  const [topic, setTopic] = useState<Topic>(Topic.Apology);
  const [language, setLanguage] = useState('English');
  const [useEmojis, setUseEmojis] = useState(true);
  const [formColors, setFormColors] = useState(DEFAULT_COLORS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mistake.trim()) {
        alert("Please describe what happened. This field can't be empty.");
        return;
    }
    onSubmit({ relationship, mood, mistake, topic, useEmojis, colors: formColors, language });
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormColors({ background: e.target.value });
  }

  const handleClearForm = () => {
    setRelationship(Relationship.Girlfriend);
    setMood(Mood.Angry);
    setMistake('');
    setTopic(Topic.Apology);
    setLanguage('English');
    setUseEmojis(true);
    setFormColors(DEFAULT_COLORS);
    onReset();
  }
  
  const labelStyle = "font-bold mt-5 block text-[#d6336c] text-xl text-center";
  const inputStyle = "w-full p-4 mt-2 rounded-[20px] border border-gray-300 text-lg text-center focus:outline-none focus:ring-2 focus:ring-[#ff69b4]";
  const buttonBaseStyle = "text-white border-none py-4 px-7 rounded-[30px] text-lg cursor-pointer transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

  const renderOutput = () => {
      if (isLoading && !message) {
          return <div className="text-center text-lg text-gray-500 italic mt-7 p-6">Generating your heartfelt message...</div>;
      }
      if (error) {
          return <div className="bg-red-100 border-l-8 border-l-red-500 text-red-800 p-6 mt-7 rounded-[20px] italic text-lg text-left">{error}</div>;
      }
      if (message) {
          return (
              <div 
                  className="bg-[#ffe6f0] border-l-[6px] p-6 mt-7 rounded-[20px] italic text-lg text-left space-y-4"
                  style={{ 
                      backgroundColor: formColors.background,
                      borderColor: '#ff69b4',
                      color: getContrastingTextColor(formColors.background)
                  }}
              >
                  <div dangerouslySetInnerHTML={{ __html: message }} />
              </div>
          );
      }
      return null;
  };

  return (
    <div className="bg-white rounded-[30px] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] w-full text-center">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <label htmlFor="relationship" className={labelStyle}>
                Relationship Type
              </label>
              <select
                id="relationship"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value as Relationship)}
                className={inputStyle}
              >
                {RELATIONSHIP_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
               <label htmlFor="mood" className={labelStyle}>
                Mood
              </label>
              <select
                id="mood"
                value={mood}
                onChange={(e) => setMood(e.target.value as Mood)}
                className={inputStyle}
              >
                {MOOD_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
        </div>

        <div>
          <label htmlFor="mistake" className={labelStyle}>
            Mistake
          </label>
          <textarea
            id="mistake"
            value={mistake}
            onChange={(e) => setMistake(e.target.value)}
            className={`${inputStyle} h-28`}
            placeholder="e.g., I forgot our anniversary..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
               <label htmlFor="topic" className={labelStyle}>
                Message Type
              </label>
              <select
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value as Topic)}
                className={inputStyle}
              >
                {TOPIC_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
                <label htmlFor="language" className={labelStyle}>
                  Preferred Language
                </label>
                <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className={inputStyle}
                >
                    {LANGUAGE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 items-end">
             <div>
                <label htmlFor="useEmojis" className={labelStyle}>Use Emojis</label>
                <select
                    id="useEmojis"
                    value={useEmojis ? 'Yes' : 'No'}
                    onChange={(e) => setUseEmojis(e.target.value === 'Yes')}
                    className={inputStyle}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
             <div>
                <label htmlFor="background" className={labelStyle}>
                    Message Background
                </label>
                 <input 
                    type="color" 
                    id="background" 
                    value={formColors.background} 
                    onChange={handleColorChange}
                    className={`${inputStyle} p-1 h-16 cursor-pointer`}
                />
            </div>
        </div>

        <div className="flex gap-5 justify-center mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`${buttonBaseStyle} bg-[#ff69b4] hover:bg-[#ff4d94] shadow-[0_4px_10px_rgba(255,105,180,0.4)]`}
            >
              {isLoading ? 'Generating...' : '💌 Generate Message'}
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              disabled={isLoading}
              className={`${buttonBaseStyle} bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-md`}
            >
              Clear
            </button>
        </div>
        
        <div className="mt-4 min-h-[50px]">
            {renderOutput()}
        </div>
      </form>
    </div>
  );
};

export default InputForm;