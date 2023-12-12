import { Theme, keyframes } from '@mui/material';

export const createDotFlashingStyles = (theme: Theme) => {
  const color = theme.palette.primary.main;

  const animation = keyframes`
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    },
    100% {
      opacity: 0.3;
    }
  `;

  return {
    dotFlashing: {
      position: 'relative',
      width: '10px',
      height: '10px',
      borderRadius: '5px',
      backgroundColor: `${color}`,
      color: `${color}`,
      animation: `${animation} 1s infinite linear alternate`,
      animationDelay: '0.5s',
      '&::before': {
        // common
        content: '""',
        display: 'inline-block',
        position: 'absolute',
        top: 0,
        // specific
        left: '-15px',
        width: '10px',
        height: '10px',
        borderRadius: '5px',
        backgroundColor: `${color}`,
        color: `${color}`,
        animation: `${animation} 1s infinite alternate`,
        animationDelay: '0s',
      },
      '&::after': {
        // common
        content: '""',
        display: 'inline-block',
        position: 'absolute',
        top: 0,
        // specific
        left: '15px',
        width: '10px',
        height: '10px',
        borderRadius: '5px',
        backgroundColor: `${color}`,
        color: `${color}`,
        animation: `${animation} 1s infinite alternate`,
        animationDelay: '1s',
      },
    },
  };
};
