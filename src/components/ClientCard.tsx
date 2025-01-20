import React from 'react';
import { Button } from "@/components/ui/button";
import { RatingBar } from './client-card/RatingBar';
import { ProfileImage } from './client-card/ProfileImage';

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

export const ClientCard = ({ 
  name, 
  ratings, 
  responseRate, 
  paymentRate,
  onRate,
  showPayment = true,
  imageUrl,
}: ClientCardProps) => {
  return (
    <div className="relative bg-white rounded-lg p-6 pb-12 shadow-md w-[300px] mx-auto min-h-[240px]">
      <ProfileImage imageUrl={imageUrl} name={name} />

      <div className="mt-8 space-y-4">
        <div className="text-center">
          <h3 className="font-semibold text-lg">
            {name.length > 20 ? `${name.slice(0, 10)}...` : name}
          </h3>
          <p className="text-sm text-gray-500">
            {ratings} {ratings === 1 ? 'valutazione' : 'valutazioni'}
          </p>
        </div>

        <div className="space-y-4">
          <RatingBar
            rate={responseRate}
            leftEmoji="👻"
            rightEmoji="🥳"
            label="Risponde ai preventivi?"
          />

          {showPayment && (
            <div className="h-[60px]">
              <RatingBar
                rate={paymentRate}
                leftEmoji="😈"
                rightEmoji="🤑"
                label="Paga?"
              />
            </div>
          )}
        </div>
      </div>

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