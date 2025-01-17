import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from '@/lib/utils';

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skipNameStep?: boolean;
}

export const RatingDialog = ({ open, onOpenChange, skipNameStep = false }: RatingDialogProps) => {
  const [step, setStep] = useState(skipNameStep ? 1 : 0);
  const [name, setName] = useState('');
  const [responded, setResponded] = useState<boolean | null>(null);
  const [paid, setPaid] = useState<'yes' | 'no' | 'late' | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const steps = [
    "Nome cliente",
    "Risposta",
    "Pagamento",
    "Conferma"
  ];

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-semibold">Aggiungi cliente</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome azienda o progetto"
              className="w-full p-2 border rounded"
            />
          </div>
        );
      case 1:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-semibold">Ha risposto al tuo preventivo?</h2>
            <p className="text-sm text-gray-500">(entro 7 giorni)</p>
            <div className="flex justify-center gap-8">
              <Button
                onClick={() => setResponded(false)}
                className={cn(
                  "flex-col h-auto py-4 px-8",
                  responded === false ? "bg-red-100" : "bg-white"
                )}
              >
                <span className="text-2xl mb-2">👻</span>
                <span>No</span>
              </Button>
              <Button
                onClick={() => setResponded(true)}
                className={cn(
                  "flex-col h-auto py-4 px-8",
                  responded === true ? "bg-green-100" : "bg-white"
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
                  "flex-col h-auto py-4 px-8",
                  paid === 'no' ? "bg-red-100" : "bg-white"
                )}
              >
                <span className="text-2xl mb-2">😈</span>
                <span>No</span>
              </Button>
              <Button
                onClick={() => setPaid('late')}
                className={cn(
                  "flex-col h-auto py-4 px-8",
                  paid === 'late' ? "bg-yellow-100" : "bg-white"
                )}
              >
                <span className="text-2xl mb-2">🐌</span>
                <span>Oltre 30 giorni</span>
              </Button>
              <Button
                onClick={() => setPaid('yes')}
                className={cn(
                  "flex-col h-auto py-4 px-8",
                  paid === 'yes' ? "bg-green-100" : "bg-white"
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
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return name.length > 0;
      case 1:
        return responded !== null;
      case 2:
        return paid !== null;
      case 3:
        return confirmed;
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white p-6 max-w-md mx-auto">
        {/* Stepper */}
        <div className="flex justify-center mb-8">
          {steps.map((_, index) => (
            <React.Fragment key={index}>
              {index > 0 && <div className="w-4" />}
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  step === index ? "bg-black" : "bg-gray-300"
                )}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Content */}
        {renderStepContent()}

        {/* Actions */}
        <div className="mt-8 flex justify-center">
          {step === 3 ? (
            <Button
              disabled={!canProceed()}
              onClick={() => onOpenChange(false)}
              className="bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
            >
              Pubblica
            </Button>
          ) : (
            <Button
              disabled={!canProceed()}
              onClick={() => setStep(step + 1)}
              className="bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
            >
              Prosegui
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};