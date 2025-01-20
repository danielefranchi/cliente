import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from '@/lib/utils';

interface RatingStepsProps {
  step: number;
  name: string;
  responded: boolean | null;
  paid: 'yes' | 'no' | 'late' | null;
  confirmed: boolean;
  setName: (name: string) => void;
  setResponded: (responded: boolean) => void;
  setPaid: (paid: 'yes' | 'no' | 'late') => void;
  setConfirmed: (confirmed: boolean) => void;
  setStep: (step: number) => void;
}

export const RatingSteps = ({
  step,
  name,
  responded,
  paid,
  confirmed,
  setName,
  setResponded,
  setPaid,
  setConfirmed,
  setStep
}: RatingStepsProps) => {
  switch (step) {
    case 0:
      return (
        <div className="text-center space-y-6">
          <h2 className="text-xl font-semibold">Aggiungi cliente</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              if (e.target.value.length <= 32) {
                setName(e.target.value);
              }
            }}
            placeholder="Nome azienda o progetto"
            className="w-full p-2 border rounded"
            maxLength={32}
          />
          {name.length > 14 && (
            <p className="text-sm text-gray-500">
              {32 - name.length} caratteri rimanenti
            </p>
          )}
        </div>
      );
    case 1:
      return (
        <div className="text-center space-y-6">
          <h2 className="text-xl font-semibold">
            Ha risposto al tuo preventivo? <span className="text-sm text-gray-500 ml-1">(entro 7 giorni)</span>
          </h2>
          <div className="flex justify-center gap-8">
            <Button
              onClick={() => {
                setResponded(false);
                setStep(3);
              }}
              className={cn(
                "flex-col h-auto py-4 px-8 border border-gray-200 text-black transition-colors",
                responded === false ? "bg-red-100 hover:bg-gray-100 hover:text-black" : "bg-white hover:bg-red-50"
              )}
            >
              <span className="text-2xl mb-2">👻</span>
              <span>No</span>
            </Button>
            <Button
              onClick={() => {
                setResponded(true);
                setStep(2);
              }}
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
    case 2:
      return (
        <div className="text-center space-y-6">
          <h2 className="text-xl font-semibold">Sei stato pagato?</h2>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setPaid('no')}
              className={cn(
                "flex-col h-auto py-4 px-8 border border-gray-200 text-black transition-colors",
                paid === 'no' ? "bg-red-100 hover:bg-gray-100 hover:text-black" : "bg-white hover:bg-red-50"
              )}
            >
              <span className="text-2xl mb-2">😈</span>
              <span>No</span>
            </Button>
            <Button
              onClick={() => setPaid('late')}
              className={cn(
                "flex-col h-auto py-4 px-8 border border-gray-200 text-black transition-colors",
                paid === 'late' ? "bg-yellow-100 hover:bg-gray-100 hover:text-black" : "bg-white hover:bg-yellow-50"
              )}
            >
              <span className="text-2xl mb-2">🐌</span>
              <span>Oltre 30 giorni</span>
            </Button>
            <Button
              onClick={() => setPaid('yes')}
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
    case 3:
      return (
        <div className="text-center space-y-6">
          <h2 className="text-xl font-semibold">Tutto vero?</h2>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-left"
            >
              Dichiaro che la mia recensione si basa su un'esperienza reale e che le informazioni fornite sono veritiere.
            </label>
          </div>
        </div>
      );
    default:
      return null;
  }
};