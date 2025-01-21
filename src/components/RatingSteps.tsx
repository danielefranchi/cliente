import React from 'react';
import { NameStep } from './rating-steps/NameStep';
import { ResponseStep } from './rating-steps/ResponseStep';
import { PaymentStep } from './rating-steps/PaymentStep';
import { ConfirmationStep } from './rating-steps/ConfirmationStep';
import { useRatingFlow } from '@/hooks/useRatingFlow';

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
  const { handleResponseSelection, handlePaymentSelection } = useRatingFlow({
    setResponded,
    setPaid,
    setStep
  });

  const steps = {
    0: <NameStep name={name} setName={setName} />,
    1: <ResponseStep responded={responded} onResponse={handleResponseSelection} />,
    2: responded ? <PaymentStep paid={paid} onPayment={handlePaymentSelection} /> : null,
    3: <ConfirmationStep confirmed={confirmed} onConfirm={setConfirmed} />
  };

  return steps[step as keyof typeof steps] || null;
};