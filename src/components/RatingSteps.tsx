import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RatingStepsProps {
  step: number;
  name: string;
  responded: boolean | null;
  paid: 'yes' | 'no' | 'late' | null;
  confirmed: boolean;
  setName: (name: string) => void;
  setResponded: (responded: boolean | null) => void;
  setPaid: (paid: 'yes' | 'no' | 'late' | null) => void;
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
  setConfirmed
}: RatingStepsProps) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 24) {
      setName(value);
    }
  };

  return (
    <div className="space-y-4">
      {step === 0 && (
        <div className="space-y-4">
          <Label htmlFor="name">Nome cliente o azienda</Label>
          <Input
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Inserisci il nome"
            maxLength={24}
          />
          <div className="text-sm text-gray-500 text-right">
            {name.length}/24 caratteri
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-center">Ha risposto al tuo preventivo?</p>
          <div className="flex justify-center gap-4">
            <Checkbox
              id="responded-yes"
              checked={responded === true}
              onCheckedChange={() => setResponded(true)}
            />
            <Label htmlFor="responded-yes">Sì</Label>
            <Checkbox
              id="responded-no"
              checked={responded === false}
              onCheckedChange={() => setResponded(false)}
            />
            <Label htmlFor="responded-no">No</Label>
          </div>
        </div>
      )}

      {step === 2 && responded && (
        <div className="space-y-4">
          <p className="text-center">Ha pagato?</p>
          <RadioGroup
            value={paid || undefined}
            onValueChange={(value) => setPaid(value as 'yes' | 'no' | 'late')}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="paid-yes" />
              <Label htmlFor="paid-yes">Sì, entro 7 giorni</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="late" id="paid-late" />
              <Label htmlFor="paid-late">Sì, ma in ritardo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="paid-no" />
              <Label htmlFor="paid-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="text-center">Confermi di voler pubblicare questa valutazione?</p>
          <div className="flex justify-center">
            <Checkbox
              id="confirm"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
            />
            <Label htmlFor="confirm" className="ml-2">
              Sì, confermo
            </Label>
          </div>
        </div>
      )}
    </div>
  );
};