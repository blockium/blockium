// import { ReactElement, Ref, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, IconButton } from '@mui/material';
// import { TransitionProps } from '@mui/material/transitions';
// import Slide from '@mui/material/Slide';
import { Close as CloseIcon } from '@mui/icons-material';

import StepperSection from '../StepperSection/StepperSection';

// const Transition = forwardRef(function Transition(
//   props: TransitionProps & {
//     children: ReactElement;
//   },
//   ref: Ref<unknown>
// ) {
//   return (
//     <Slide direction="up" ref={ref} {...props} />
//     // <Grow ref={ref} {...props} />
//   );
// });

type StepperDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const StepperDialog: React.FC<StepperDialogProps> = (
  props: StepperDialogProps,
) => {
  const { open, onClose } = props;
  const navigate = useNavigate();

  const navLabels = ['Fechar', 'Passo 2', 'Passo 3', 'Login'];

  const handleBackFirst = () => {
    onClose();
  };

  const handleNextLast = () => {
    navigate('/login');
  };

  const isSmallDown = false; //  useIsSmall();

  const marginHeight = isSmallDown ? 0 : 64; // Dialog margin (top + bottom). Necessary to adjust StepperSection height. MUI default is 64.

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isSmallDown}
      maxWidth="lg"
      // TransitionComponent={Transition}
      PaperProps={{
        sx: { maxHeight: `calc(100% - ${marginHeight}px)` },
      }}
      // sx={{
      //   "& .MuiDialog-container .MuiDialog-paper": {
      //     margin: "0px 0px",
      //     maxHeight: "100%",
      //     // borderRadius: 0,
      //   },
      // }}
    >
      <IconButton
        aria-label="close"
        size="small"
        onClick={onClose}
        sx={{
          zIndex: 10000,
          position: 'absolute',
          p: 2,
          right: 0,
          top: 2,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <StepperSection
        navLabels={navLabels}
        handleBackFirst={handleBackFirst}
        handleNextLast={handleNextLast}
        sx={{ mt: isSmallDown ? '32px' : '0px', height: '500px' }}
      >
        <div>Step 1</div>
        <div>Step 2</div>
        <div>Step 3</div>
      </StepperSection>
    </Dialog>
  );
};

export default StepperDialog;
