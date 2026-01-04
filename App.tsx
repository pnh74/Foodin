import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Compass, User, Bookmark } from 'lucide-react';
import AISearch from './components/AISearch';
import SocialFeed from './components/SocialFeed';
import DiscoverySwipe from './components/DiscoverySwipe';
import RestaurantCard from './components/RestaurantCard';
import { ViewState, Restaurant } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [searchResults, setSearchResults] = useState<Restaurant[] | null>(null);

  const renderContent = () => {
    if (currentView === 'discovery') {
      return <DiscoverySwipe />;
    }

    if (currentView === 'home') {
      return (
        <div className="max-w-2xl mx-auto px-4 pt-4 min-h-screen">
          {/* Header Area */}
          <div className="sticky top-4 z-40 mb-6">
            <AISearch onResults={setSearchResults} />
          </div>

          {/* Dynamic Content: Results or Feed */}
          {searchResults ? (
            <div className="space-y-6 pb-24 animate-in fade-in duration-500">
               <div className="flex justify-between items-end px-1">
                 <h2 className="font-serif text-2xl font-bold text-gray-900">Recommended</h2>
                 <button 
                  onClick={() => setSearchResults(null)}
                  className="text-sm text-gray-500 hover:text-foodin-orange"
                 >
                   Clear Search
                 </button>
               </div>
               <div className="grid gap-6">
                 {searchResults.map(r => (
                   <RestaurantCard key={r.id} data={r} />
                 ))}
               </div>
            </div>
          ) : (
            <div className="space-y-6">
               <div className="px-1">
                 <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Community Cravings</h2>
                 <SocialFeed />
               </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Work in Progress
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${currentView === 'discovery' ? 'bg-black' : 'bg-foodin-bg'}`}>
      
      {/* Main Content Area */}
      <main className="h-full">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className={`
        fixed bottom-0 left-0 right-0 z-50 px-6 py-4 
        ${currentView === 'discovery' ? 'bg-gradient-to-t from-black to-transparent text-white border-t border-white/10' : 'bg-white border-t border-gray-100 text-gray-400'}
      `}>
        <div className="max-w-md mx-auto flex justify-between items-center">
          <button 
            onClick={() => {
              setCurrentView('home');
              setSearchResults(null);
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'home' ? 'text-foodin-orange' : 'hover:text-gray-500'}`}
          >
            <Home className="w-6 h-6" strokeWidth={currentView === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          
          <button 
            onClick={() => setCurrentView('discovery')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'discovery' ? 'text-foodin-orange' : 'hover:text-gray-500'}`}
          >
            <Compass className="w-6 h-6" strokeWidth={currentView === 'discovery' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Discover</span>
          </button>

          <button 
            onClick={() => setCurrentView('saved')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'saved' ? 'text-foodin-orange' : 'hover:text-gray-500'}`}
          >
            <Bookmark className="w-6 h-6" strokeWidth={currentView === 'saved' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Saved</span>
          </button>

          <button 
            onClick={() => setCurrentView('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'profile' ? 'text-foodin-orange' : 'hover:text-gray-500'}`}
          >
            <User className="w-6 h-6" strokeWidth={currentView === 'profile' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
