import React from 'react';
import { cn } from '@/lib/utils';

interface RatingBarProps {
  rating: number;
  className?: string;
}

export const RatingBar = ({ rating, className }: RatingBarProps) => {
  // Ensure rating is between 0 and 6
  const normalizedRating = Math.max(0, Math.min(6, Math.round(rating)));
  
  // Calculate position percentage (0-100)
  const position = (normalizedRating / 6) * 100;

  return (
    <div className={cn("relative w-full h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500", className)}>
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transform -translate-x-1/2"
        style={{ left: `${position}%` }}
      />
    </div>
  );
};