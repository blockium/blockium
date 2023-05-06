import { Button, CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';

interface CTAButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  [key: string]: unknown;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  onClick,
  disabled,
  loading,
  ...rest
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled || loading}
      sx={{ padding: '1.2rem 2.4rem', borderRadius: '0.6em' }}
      {...rest}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: green[500] }} />
      ) : (
        children
      )}
    </Button>
  );
};

export default CTAButton;
