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
    if (!hasResponded) {
      // If they didn't respond, skip the payment step
      setStep(3);
    } else {
      setStep(2);
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