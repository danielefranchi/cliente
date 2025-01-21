import React from 'react';
import { NameStep } from './rating-steps/NameStep';
import { ResponseStep } from './rating-steps/ResponseStep';
import { PaymentStep } from './rating-steps/PaymentStep';
import { ConfirmationStep } from './rating-steps/ConfirmationStep';

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
  const handleResponseSelection = (hasResponded: boolean) => {
    setResponded(hasResponded);
    setStep(2);
  };

  const handlePaymentSelection = (paymentStatus: 'yes' | 'no' | 'late') => {
    setPaid(paymentStatus);
    setStep(3);
  };

  switch (step) {
    case 0:
      return <NameStep name={name} setName={setName} />;
    case 1:
      return <ResponseStep responded={responded} onResponse={handleResponseSelection} />;
    case 2:
      return <PaymentStep paid={paid} onPayment={handlePaymentSelection} />;
    case 3:
      return <ConfirmationStep confirmed={confirmed} onConfirm={setConfirmed} />;
    default:
      return null;
  }
};