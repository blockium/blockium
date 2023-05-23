import { createContext } from 'react';

interface StepperContextProps {
  activeStep: number;
  activeComponentName?: string;
}

export const StepperContext = createContext<StepperContextProps>({
  activeStep: 0,
});

export default StepperContext;
