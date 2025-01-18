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
}

export const ClientCard = ({ 
  name, 
  ratings, 
  responseRate, 
  paymentRate, 
  onRate,
  showPayment = true 
}: ClientCardProps) => {
  return (
    <div className="relative bg-white rounded-lg p-6 pb-12 shadow-md w-[300px] mx-auto">
      {/* Profile Picture */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 bg-[#F0F0F0] rounded-full flex items-center justify-center">
          <span className="text-2xl">🏢</span>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 space-y-4">
        <div className="text-center">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-500">{ratings} valutazioni</p>
        </div>

        {/* Rating Bars */}
        <div className="space-y-4">
          <div>
            <p className="text-center mb-0">Risponde ai preventivi?</p>
            <div className="flex items-center gap-2">
              <span className="text-xl">👻</span>
              <div className="flex-1 h-2 rounded-full bg-gray-200">
                <div className={cn(
                  "h-2 rounded-full transition-all",
                  responseRate === 0 ? "w-[10%] bg-red-500" :
                  responseRate === 50 ? "w-1/2 bg-orange-500" :
                  "w-full bg-green-500"
                )} />
              </div>
              <span className="text-xl">🥳</span>
            </div>
          </div>

          {showPayment && (
            <div className={cn(
              "transition-opacity duration-200",
              !showPayment && "opacity-0"
            )}>
              <p className="text-center mb-0">Paga?</p>
              <div className="flex items-center gap-2">
                <span className="text-xl">😈</span>
                <div className="flex-1 h-2 rounded-full bg-gray-200">
                  <div className={cn(
                    "h-2 rounded-full transition-all",
                    paymentRate === 0 ? "w-[10%] bg-red-500" :
                    paymentRate === 50 ? "w-1/2 bg-orange-500" :
                    "w-full bg-green-500"
                  )} />
                </div>
                <span className="text-xl">🤑</span>
              </div>
            </div>
          )}
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