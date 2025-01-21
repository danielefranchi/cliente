interface UseRatingFlowProps {
  setResponded: (responded: boolean) => void;
  setPaid: (paid: 'yes' | 'no' | 'late') => void;
  setStep: (step: number) => void;
}

export const useRatingFlow = ({
  setResponded,
  setPaid,
  setStep
}: UseRatingFlowProps) => {
  const handleResponseSelection = (hasResponded: boolean) => {
    setResponded(hasResponded);
    // If they didn't respond, skip the payment step and go directly to confirmation
    setStep(hasResponded ? 2 : 3);
    // If they didn't respond, set paid to null
    if (!hasResponded) {
      setPaid(null);
    }
  };

  const handlePaymentSelection = (paymentStatus: 'yes' | 'no' | 'late') => {
    setPaid(paymentStatus);
    setStep(3);
  };

  return {
    handleResponseSelection,
    handlePaymentSelection
  };
};