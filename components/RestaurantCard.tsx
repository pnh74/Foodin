import React from 'react';
import { Restaurant } from '../types';
import { ShieldCheck, MapPin, DollarSign, Star } from 'lucide-react';

interface Props {
  data: Restaurant;
}

const RestaurantCard: React.FC<Props> = ({ data }) => {
  const isTrusted = data.trustScore >= 90;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="relative h-48">
        <img 
          src={data.image} 
          alt={data.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          {isTrusted ? (
            <ShieldCheck className="w-4 h-4 text-green-500" />
          ) : (
             <ShieldCheck className="w-4 h-4 text-yellow-500" />
          )}
          <span className={`text-xs font-bold ${isTrusted ? 'text-green-700' : 'text-yellow-700'}`}>
            {data.trustScore}% Trust
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-serif text-lg font-bold text-foodin-gray mb-1">{data.name}</h3>
        
        {/* Tri-Keyword Pill */}
        <div className="inline-block bg-orange-50 px-3 py-1 rounded-full border border-orange-100 mb-3">
          <span className="text-xs font-mono font-medium text-foodin-orange tracking-tight">
            {data.triKeyword}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 font-ui">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {data.distance}
            </span>
            <span className="flex items-center gap-1">
               <DollarSign className="w-3 h-3" /> {data.priceRange}
            </span>
          </div>
          <div className="flex items-center gap-1 text-foodin-gray font-semibold">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {data.rating}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
