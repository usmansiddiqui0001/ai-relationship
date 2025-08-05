
import React, { useState, useCallback } from 'react';
import type { FormData } from './types';
import Header from './components/Header';
import InputForm from './components/InputForm';
import { generateRelationshipMessageStream } from './services/geminiService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);

  const handleFormSubmit = useCallback(async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedMessage(""); 

    try {
      const stream = await generateRelationshipMessageStream(data);
      let fullMessage = "";
      for await (const chunk of stream) {
        fullMessage += chunk;
        setGeneratedMessage(fullMessage);
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleReset = useCallback(() => {
    setGeneratedMessage(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center p-5 font-sans"
      style={{ background: 'linear-gradient(135deg, #ffcccc, #ffe6e6)' }}
    >
       <Header />
      <main className="w-full max-w-3xl flex-grow flex items-start justify-center mt-8">
         <InputForm 
            onSubmit={handleFormSubmit} 
            onReset={handleReset}
            isLoading={isLoading} 
            message={generatedMessage}
            error={error}
         />
      </main>
      <footer className="text-center py-12 text-gray-500 text-base">
        <p>Powered by Gemini AI. Handle with care, speak from the heart.</p>
      </footer>
    </div>
  );
};

export default App;