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
    if (percentage >= 10) return 'bg-red-500';
    return 'bg-red-500';
  };

  const calculateBarPosition = (rate: number) => {
    const position = Math.round((rate / 100) * 6);
    return `${(position / 6) * 100}%`;
  };

  const position = calculateBarPosition(rate);
  const barColor = getBarColor(rate);

  return (
    <div>
      <p className="text-center mb-0">{label}</p>
      <div className="flex items-center gap-2">
        <span className="text-xl">{leftEmoji}</span>
        <div className="flex-1 h-2 rounded-full bg-gray-200 relative">
          <div 
            className={cn("h-2 rounded-full transition-all", barColor)}
            style={{ width: position }}
          />
          <div 
            className="w-3 h-3 bg-white rounded-full shadow-md absolute top-1/2 -translate-y-1/2"
            style={{ left: position }}
          />
        </div>
        <span className="text-xl">{rightEmoji}</span>
      </div>
    </div>
  );
};