import { useTheme, styled } from '@mui/material/styles';
import { Button, MobileStepper } from '@mui/material';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';

const StepperButton = styled(Button)`
  &&& {
    &.MuiButton-root {
      color: #fff;
    }
    &.Mui-disabled {
      color: transparent;
    }
  }
`;

type SectionStepperProps = {
  activeStep: number;
  maxSteps: number;
  handleNext: () => void;
  handleBack: () => void;
  backLabel?: string;
  nextLabel?: string;
  hasFirstBack?: boolean;
  hasNextLast?: boolean;
};

export const Stepper: React.FC<SectionStepperProps> = (
  props: SectionStepperProps,
) => {
  const {
    activeStep,
    maxSteps,
    handleNext,
    handleBack,
    backLabel,
    nextLabel,
    hasFirstBack,
    hasNextLast,
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <MobileStepper
      steps={maxSteps}
      variant="dots"
      position="static"
      activeStep={activeStep}
      nextButton={
        <StepperButton
          className={`nextStepButton${activeStep}`}
          size="medium"
          onClick={handleNext}
          disabled={!hasNextLast && activeStep === maxSteps - 1}
        >
          {nextLabel || t('ui:stepper.next')}
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </StepperButton>
      }
      backButton={
        <StepperButton
          className={`backStepButton${activeStep}`}
          size="medium"
          onClick={handleBack}
          disabled={!hasFirstBack && activeStep === 0}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          {backLabel || t('ui:stepper.previous')}
        </StepperButton>
      }
    />
  );
};

export default Stepper;
