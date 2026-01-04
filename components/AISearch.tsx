import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Search, ArrowRight, X } from 'lucide-react';
import { PLACEHOLDERS, MOCK_RESTAURANTS } from '../constants';
import { generateRestaurantRecommendations } from '../services/geminiService';
import { Restaurant } from '../types';

interface AISearchProps {
  onResults: (results: Restaurant[]) => void;
}

const AISearch: React.FC<AISearchProps> = ({ onResults }) => {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  // Typewriter effect for placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setIsFocused(false); // Collapse expanded view partially
    setAiResponse('');

    try {
      const response = await generateRestaurantRecommendations(query);
      
      // Simulate streaming text effect
      const text = response.text || "";
      const words = text.split(' ');
      
      let currentText = "";
      words.forEach((word, index) => {
        setTimeout(() => {
          currentText += word + " ";
          setAiResponse(currentText);
        }, index * 50);
      });

      // Filter mock results loosely based on query for demo purposes
      // In a real app, the RAG system returns the IDs of relevant restaurants
      const relevantRestaurants = MOCK_RESTAURANTS.slice(0, 2); 
      setTimeout(() => {
          onResults(relevantRestaurants);
      }, words.length * 50 + 500);

    } catch (err) {
      console.error(err);
      setAiResponse("Oops! My brain froze. Try again? 🍦");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative z-50 transition-all duration-300 ease-out ${isFocused ? 'scale-105' : 'scale-100'}`}>
      <form onSubmit={handleSearch} className="relative group">
        <div className={`
          absolute inset-0 bg-gradient-to-r from-foodin-orange/20 to-foodin-accent/20 rounded-full blur-xl transition-opacity duration-300
          ${isFocused || isLoading ? 'opacity-100' : 'opacity-0'}
        `}></div>
        
        <div className={`
          relative flex items-center bg-white/90 backdrop-blur-xl border transition-all duration-300 rounded-full shadow-lg
          ${isFocused ? 'ring-2 ring-foodin-orange border-transparent shadow-foodin-orange/20' : 'border-gray-200'}
        `}>
          <div className="pl-4 text-foodin-orange">
            {isLoading ? (
               <Sparkles className="w-5 h-5 animate-spin" />
            ) : (
               <Sparkles className="w-5 h-5" />
            )}
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => !query && setIsFocused(false)}
            placeholder={PLACEHOLDERS[placeholderIndex]}
            className="w-full bg-transparent px-3 py-4 text-foodin-gray placeholder-gray-400 focus:outline-none font-sans text-base"
          />
          
          <button 
            type="submit"
            disabled={!query}
            className={`
              mr-2 p-2 rounded-full transition-all duration-200
              ${query ? 'bg-foodin-orange text-white hover:bg-orange-600' : 'bg-gray-100 text-gray-400'}
            `}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* AI Response Bubble */}
      {aiResponse && (
        <div className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 shadow-lg border border-blue-100 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center shrink-0">
                 <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                 <p className="text-foodin-gray text-sm leading-relaxed font-sans">
                    {aiResponse}
                    {isLoading && <span className="inline-block w-1.5 h-4 ml-1 bg-foodin-accent animate-pulse align-middle"></span>}
                 </p>
              </div>
              <button onClick={() => setAiResponse(null)} className="text-gray-400 hover:text-gray-600">
                 <X className="w-4 h-4" />
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default AISearch;
