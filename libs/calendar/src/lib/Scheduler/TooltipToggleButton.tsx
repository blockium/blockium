import { forwardRef } from 'react';
import {
  ToggleButton,
  ToggleButtonProps,
  Tooltip,
  TooltipProps,
} from '@mui/material';

type TooltipToggleButtonProps = ToggleButtonProps & {
  TooltipProps: Omit<TooltipProps, 'children'>;
};

// Catch props and forward to ToggleButton
export const TooltipToggleButton = forwardRef<
  HTMLButtonElement,
  TooltipToggleButtonProps
>(({ TooltipProps, ...props }, ref) => {
  return (
    <Tooltip {...TooltipProps}>
      <ToggleButton ref={ref} {...props} />
    </Tooltip>
  );
});

export default TooltipToggleButton;
