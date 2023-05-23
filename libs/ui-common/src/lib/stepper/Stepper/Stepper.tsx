import { useTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { msg } from '@postgpt/i18n';

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
  props: SectionStepperProps
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
          {nextLabel || msg('ui-common.stepper.next')}
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
          {backLabel || msg('ui-common.stepper.previous')}
        </StepperButton>
      }
    />
  );
};

export default Stepper;
