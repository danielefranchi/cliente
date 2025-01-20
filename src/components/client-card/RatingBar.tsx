import React from 'react';
import { cn } from '@/lib/utils';

interface RatingBarProps {
  rate: number;
  leftEmoji: string;
  rightEmoji: string;
  label: string;
}

export const RatingBar = ({ rate, leftEmoji, rightEmoji, label }: RatingBarProps) => {
  const getBarColor = (percentage: number) => {
    if (percentage >= 60) return 'bg-green-500';
    if (percentage >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Ensure minimum 10% for visualization
  const normalizedRate = Math.max(10, rate);
  const barColor = getBarColor(rate);

  return (
    <div>
      <p className="text-center mb-0">{label}</p>
      <div className="flex items-center gap-2">
        <span className="text-xl">{leftEmoji}</span>
        <div className="flex-1 h-2 rounded-full bg-gray-200">
          <div 
            className={cn("h-2 rounded-full transition-all", barColor)}
            style={{ width: `${normalizedRate}%` }}
          />
        </div>
        <span className="text-xl">{rightEmoji}</span>
      </div>
    </div>
  );
};