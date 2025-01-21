interface UseRatingValidationProps {
  step: number;
  name: string;
  responded: boolean | null;
  paid: 'yes' | 'no' | 'late' | null;
  confirmed: boolean;
}

export const useRatingValidation = ({
  step,
  name,
  responded,
  paid,
  confirmed
}: UseRatingValidationProps) => {
  const canProceed = () => {
    switch (step) {
      case 0:
        return name.length > 0 && name.length <= 32;
      case 1:
        return responded !== null;
      case 2:
        return responded === false || paid !== null;
      case 3:
        return confirmed;
      default:
        return false;
    }
  };

  return { canProceed };
};