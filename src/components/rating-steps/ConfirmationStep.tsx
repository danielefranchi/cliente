import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";

interface ConfirmationStepProps {
  confirmed: boolean;
  onConfirm: (confirmed: boolean) => void;
}

export const ConfirmationStep = ({ confirmed, onConfirm }: ConfirmationStepProps) => {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-xl font-semibold">Tutto vero?</h2>
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={confirmed}
          onCheckedChange={(checked) => onConfirm(checked as boolean)}
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
};