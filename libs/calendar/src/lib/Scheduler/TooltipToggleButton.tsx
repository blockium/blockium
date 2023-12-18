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
// eslint-disable-next-line react/display-name
export const TooltipToggleButton: React.FC<TooltipToggleButtonProps> =
  forwardRef(({ TooltipProps, ...props }, ref) => {
    return (
      <Tooltip {...TooltipProps}>
        <ToggleButton ref={ref} {...props} />
      </Tooltip>
    );
  });

export default TooltipToggleButton;
