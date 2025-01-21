import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface ResponseStepProps {
  responded: boolean | null;
  onResponse: (hasResponded: boolean) => void;
}

export const ResponseStep = ({ responded, onResponse }: ResponseStepProps) => {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-xl font-semibold">
        Ha risposto al tuo preventivo? <span className="text-sm text-gray-500 ml-1">(entro 7 giorni)</span>
      </h2>
      <div className="flex justify-center gap-8">
        <Button
          onClick={() => onResponse(false)}
          className={cn(
            "flex-col h-auto py-4 px-8 border border-gray-200 text-black transition-colors",
            responded === false ? "bg-red-100 hover:bg-gray-100 hover:text-black" : "bg-white hover:bg-red-50"
          )}
        >
          <span className="text-2xl mb-2">👻</span>
          <span>No</span>
        </Button>
        <Button
          onClick={() => onResponse(true)}
          className={cn(
            "flex-col h-auto py-4 px-8 border border-gray-200 text-black transition-colors",
            responded === true ? "bg-green-100 hover:bg-gray-100 hover:text-black" : "bg-white hover:bg-green-50"
          )}
        >
          <span className="text-2xl mb-2">🥳</span>
          <span>Si</span>
        </Button>
      </div>
    </div>
  );
};