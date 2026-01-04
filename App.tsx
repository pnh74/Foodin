import React, { useState, useEffect } from 'react';
import { Home, Compass, User as UserIcon, Bookmark, LogOut, CheckCircle2 } from 'lucide-react';
import AISearch from './components/AISearch';
import SocialFeed from './components/SocialFeed';
import DiscoverySwipe from './components/DiscoverySwipe';
import RestaurantCard from './components/RestaurantCard';
import LoginModal from './components/LoginModal';
import { ViewState, Restaurant, User, UserIntent } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [searchResults, setSearchResults] = useState<Restaurant[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingIntent, setPendingIntent] = useState<UserIntent>(null);

  // Persistence
  useEffect(() => {
    const savedUser = localStorage.getItem('foodin_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleProtectedAction = (type: 'like' | 'save' | 'comment', targetId: string) => {
    if (!user) {
      setPendingIntent({ type, targetId });
      setIsLoginModalOpen(true);
      return false;
    }
    // Logic for authenticated user actions here
    console.log(`Executing ${type} on ${targetId}`);
    return true;
  };

  const finalizeLogin = () => {
    const mockUser: User = {
      id: 'u_123',
      name: 'Thanh Nguyen',
      avatar: 'https://i.pravatar.cc/150?u=thanh',
      isTrusted: true,
      savedRestaurants: [],
      likedPosts: []
    };
    setUser(mockUser);
    localStorage.setItem('foodin_user', JSON.stringify(mockUser));
    setIsLoginModalOpen(false);

    // Execute the intent user had before login
    if (pendingIntent) {
      console.log(`Executing deferred intent: ${pendingIntent.type} on ${pendingIntent.targetId}`);
      setPendingIntent(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('foodin_user');
    setCurrentView('home');
  };

  const renderContent = () => {
    if (currentView === 'discovery') {
      return <DiscoverySwipe onAction={handleProtectedAction} />;
    }

    if (currentView === 'profile') {
      return (
        <div className="max-w-2xl mx-auto px-6 pt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {user ? (
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white shadow-xl mx-auto" />
                <div className="absolute -bottom-1 -right-1 bg-foodin-orange text-white p-1 rounded-full shadow-lg border-2 border-white">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <h1 className="text-2xl font-serif font-bold text-foodin-gray">{user.name}</h1>
              <p className="text-gray-500 text-sm mb-8 font-ui">Trusted Reviewer · 42 reviews</p>
              
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                   <div className="text-lg font-bold text-foodin-orange">1.2k</div>
                   <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Followers</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                   <div className="text-lg font-bold text-foodin-orange">340</div>
                   <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Following</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                   <div className="text-lg font-bold text-foodin-orange">89</div>
                   <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Saves</div>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full py-4 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          ) : (
            <div className="text-center py-20">
              <UserIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2 font-serif">Hello, Foodie!</h2>
              <p className="text-gray-500 mb-8 max-w-xs mx-auto text-sm leading-relaxed">Login to track your culinary journey and connect with others.</p>
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-foodin-orange text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-orange-200 active:scale-95 transition-all"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      );
    }

    if (currentView === 'home') {
      return (
        <div className="max-w-2xl mx-auto px-4 pt-4 min-h-screen">
          <div className="sticky top-4 z-40 mb-6">
            <AISearch onResults={setSearchResults} />
          </div>

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
                 <SocialFeed onAction={handleProtectedAction} />
               </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-400 px-10 text-center">
        <Bookmark className="w-12 h-12 mb-4 opacity-20" />
        <h3 className="text-lg font-bold text-gray-600 mb-2">No Saved Gems Yet</h3>
        <p className="text-sm max-w-xs leading-relaxed">When you find a place that looks delicious, tap the bookmark icon to save it here!</p>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${currentView === 'discovery' ? 'bg-black' : 'bg-foodin-bg'}`}>
      
      <main className="h-full">
        {renderContent()}
      </main>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => {
          setIsLoginModalOpen(false);
          setPendingIntent(null);
        }}
        onLogin={finalizeLogin}
      />

      <nav className={`
        fixed bottom-0 left-0 right-0 z-50 px-6 py-4 
        ${currentView === 'discovery' ? 'bg-gradient-to-t from-black/90 to-transparent text-white border-t border-white/10' : 'bg-white/80 backdrop-blur-xl border-t border-gray-100 text-gray-400'}
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
            <UserIcon className="w-6 h-6" strokeWidth={currentView === 'profile' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
