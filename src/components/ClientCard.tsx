import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface ClientCardProps {
  name: string;
  ratings: number;
  responseRate: number;
  paymentRate: number;
  onRate: () => void;
  showPayment?: boolean;
  imageUrl?: string;
  averageRating?: number;
}

const calculateBarPosition = (rate: number) => {
  // Convert rate to a position between 0-6
  const position = Math.round((rate / 100) * 6);
  return `${(position / 6) * 100}%`;
};

const getGradientStyle = () => ({
  background: 'linear-gradient(to right, #EF4444 50%, #EAB308 33%, #22C55E)'
});

const truncateName = (name: string) => {
  if (name.length > 20) {
    return `${name.slice(0, 10)}...`;
  }
  return name;
};

export const ClientCard = ({ 
  name, 
  ratings, 
  responseRate, 
  paymentRate,
  onRate,
  showPayment = true,
  imageUrl,
  averageRating
}: ClientCardProps) => {
  const displayName = truncateName(name);
  
  return (
    <div className="relative bg-white rounded-lg p-6 pb-12 shadow-md w-[300px] mx-auto min-h-[240px]">
      {/* Profile Picture */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 bg-[#F0F0F0] rounded-full flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl">🏢</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 space-y-4">
        <div className="text-center">
          <h3 className="font-semibold text-lg">{displayName}</h3>
          <p className="text-sm text-gray-500">{ratings} {ratings === 1 ? 'valutazione' : 'valutazioni'}</p>
        </div>

        {/* Rating Bars */}
        <div className="space-y-4">
          <div>
            <p className="text-center mb-0">Risponde ai preventivi?</p>
            <div className="flex items-center gap-2">
              <span className="text-xl">👻</span>
              <div className="flex-1 h-2 rounded-full bg-gray-200 relative">
                <div style={getGradientStyle()} className={cn(
                  "h-2 rounded-full transition-all",
                  responseRate === 0 ? "w-[16.67%]" :
                  `w-[${calculateBarPosition(responseRate)}]`
                )} />
                <div 
                  className="w-3 h-3 bg-white rounded-full shadow-md absolute top-1/2 -translate-y-1/2"
                  style={{ left: calculateBarPosition(responseRate) }}
                />
              </div>
              <span className="text-xl">🥳</span>
            </div>
          </div>

          <div className={cn(
            "transition-opacity duration-200",
            !showPayment && "opacity-0 invisible",
            "h-[60px]"
          )}>
            <p className="text-center mb-0">Paga?</p>
            <div className="flex items-center gap-2">
              <span className="text-xl">😈</span>
              <div className="flex-1 h-2 rounded-full bg-gray-200 relative">
                <div style={getGradientStyle()} className={cn(
                  "h-2 rounded-full transition-all",
                  paymentRate === 0 ? "w-[16.67%]" :
                  `w-[${calculateBarPosition(paymentRate)}]`
                )} />
                <div 
                  className="w-3 h-3 bg-white rounded-full shadow-md absolute top-1/2 -translate-y-1/2"
                  style={{ left: calculateBarPosition(paymentRate) }}
                />
              </div>
              <span className="text-xl">🤑</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Button */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
        <Button 
          onClick={onRate}
          className="rounded-full px-6 py-4 bg-black hover:bg-white hover:text-black border-2 border-black transition-colors"
        >
          Valuta
        </Button>
      </div>
    </div>
  );
};