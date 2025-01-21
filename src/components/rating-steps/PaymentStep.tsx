import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface PaymentStepProps {
  paid: 'yes' | 'no' | 'late' | null;
  onPayment: (status: 'yes' | 'no' | 'late') => void;
}

export const PaymentStep = ({ paid, onPayment }: PaymentStepProps) => {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-xl font-semibold">Sei stato pagato?</h2>
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => onPayment('no')}
          className={cn(
            "flex-col h-auto py-4 px-8 border border-gray-200 text-black transition-colors",
            paid === 'no' ? "bg-red-100 hover:bg-gray-100 hover:text-black" : "bg-white hover:bg-red-50"
          )}
        >
          <span className="text-2xl mb-2">😈</span>
          <span>No</span>
        </Button>
        <Button
          onClick={() => onPayment('late')}
          className={cn(
            "flex-col h-auto py-4 px-8 border border-gray-200 text-black transition-colors",
            paid === 'late' ? "bg-yellow-100 hover:bg-gray-100 hover:text-black" : "bg-white hover:bg-yellow-50"
          )}
        >
          <span className="text-2xl mb-2">🐌</span>
          <span>Oltre 30 giorni</span>
        </Button>
        <Button
          onClick={() => onPayment('yes')}
          className={cn(
            "flex-col h-auto py-4 px-8 border border-gray-200 text-black transition-colors",
            paid === 'yes' ? "bg-green-100 hover:bg-gray-100 hover:text-black" : "bg-white hover:bg-green-50"
          )}
        >
          <span className="text-2xl mb-2">🤑</span>
          <span>Si</span>
        </Button>
      </div>
    </div>
  );
};