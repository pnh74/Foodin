import React, { useState, useRef, useEffect } from 'react';
import { MOCK_VIDEOS } from '../constants';
import { Heart, X, MapPin, Share2, Bookmark } from 'lucide-react';

const DiscoverySwipe: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const currentVideo = MOCK_VIDEOS[currentIndex];
  const nextVideo = MOCK_VIDEOS[currentIndex + 1];

  const handleStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current) return;
    const delta = clientX - startX.current;
    setDragX(delta);
  };

  const handleEnd = () => {
    isDragging.current = false;
    const threshold = 100; // px to trigger swipe

    if (Math.abs(dragX) > threshold) {
      // Swipe triggered
      const direction = dragX > 0 ? 1 : -1; // 1 = right (like), -1 = left (pass)
      
      // Animate out
      // In a real app, use a library for smooth exit animations. 
      // Here we just jump to next index after a brief delay for simplicity in code generation.
      setCurrentIndex((prev) => (prev + 1) % MOCK_VIDEOS.length);
    }
    
    setDragX(0);
  };

  // Mouse Events
  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onMouseUp = () => handleEnd();

  // Touch Events
  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  const onTouchEnd = () => handleEnd();

  if (!currentVideo) return <div className="h-full flex items-center justify-center text-white">No more suggestions!</div>;

  // Calculate rotation and opacity based on drag
  const rotation = dragX * 0.05;
  const likeOpacity = Math.max(0, dragX / 200);
  const nopeOpacity = Math.max(0, -dragX / 200);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden select-none">
      
      {/* Background/Next Card (Preloader) */}
      {nextVideo && (
        <div className="absolute inset-0 z-0 transform scale-95 opacity-50">
           <img src={nextVideo.url} className="w-full h-full object-cover" alt="" />
        </div>
      )}

      {/* Active Card */}
      <div 
        ref={containerRef}
        className="absolute inset-0 z-10 origin-bottom transition-transform duration-75 ease-linear cursor-grab active:cursor-grabbing"
        style={{ transform: `translateX(${dragX}px) rotate(${rotation}deg)` }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img 
          src={currentVideo.url} 
          alt="Discovery" 
          className="w-full h-full object-cover"
          draggable={false}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="absolute top-10 left-10 p-4 border-4 border-green-500 rounded-xl transform -rotate-12 opacity-0" style={{ opacity: likeOpacity }}>
           <span className="text-4xl font-bold text-green-500 uppercase tracking-widest">Yum</span>
        </div>
        <div className="absolute top-10 right-10 p-4 border-4 border-red-500 rounded-xl transform rotate-12 opacity-0" style={{ opacity: nopeOpacity }}>
           <span className="text-4xl font-bold text-red-500 uppercase tracking-widest">Nah</span>
        </div>

        {/* Info Overlay (Bottom Gradient) */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end pointer-events-none">
          
          <div className="mb-20">
            <h2 className="text-3xl font-serif font-bold text-white mb-2 drop-shadow-md">
              {currentVideo.restaurant.name}
            </h2>
            <div className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full mb-3 border border-white/10">
              <span className="text-foodin-orange font-mono text-sm font-bold">
                {currentVideo.restaurant.triKeyword}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-white/90 text-sm font-ui">
               <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{currentVideo.restaurant.distance}</span>
               </div>
               <div className="flex items-center space-x-1">
                  <span className="text-yellow-400 font-bold">{currentVideo.restaurant.priceRange}</span>
               </div>
               <div className="flex items-center space-x-1">
                  <span className="text-green-400 font-bold">{currentVideo.restaurant.trustScore}% Trust</span>
               </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Right) - Needs pointer-events-auto */}
        <div className="absolute right-4 bottom-24 flex flex-col space-y-4 pointer-events-auto">
           <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <Heart className="w-6 h-6" />
           </button>
           <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <Bookmark className="w-6 h-6" />
           </button>
           <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <Share2 className="w-6 h-6" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverySwipe;
