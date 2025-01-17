import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface ClientCardProps {
  name: string;
  ratings: number;
  responseRate: number;
  paymentRate: number;
  onRate: () => void;
}

export const ClientCard = ({ name, ratings, responseRate, paymentRate, onRate }: ClientCardProps) => {
  return (
    <div className="relative bg-white rounded-lg p-6 shadow-md mb-6 w-[300px]">
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
              <div className={cn(
                "flex-1 h-2 rounded-full",
                responseRate > 0 ? "bg-green-500" : "bg-red-300"
              )} />
              <span className="text-xl">🥳</span>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-center mb-0">Paga?</p>
            <div className="flex items-center gap-2 mt-8">
              <span className="text-xl">😈</span>
              <div className={cn(
                "flex-1 h-2 rounded-full",
                paymentRate > 0 ? "bg-green-500" : "bg-red-300"
              )} />
              <span className="text-xl">🤑</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Button */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
        <Button 
          onClick={onRate}
          className="rounded-full px-6 bg-black hover:bg-white hover:text-black border-2 border-black transition-colors"
        >
          Valuta
        </Button>
      </div>
    </div>
  );
};