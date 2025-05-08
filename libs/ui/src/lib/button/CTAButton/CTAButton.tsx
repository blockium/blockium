import { Button, CircularProgress, SxProps } from '@mui/material';
import { green } from '@mui/material/colors';

interface CTAButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  sx?: SxProps;
  [key: string]: unknown;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  onClick,
  disabled,
  loading,
  sx,
  ...rest
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled || loading}
      sx={{ padding: '0.75rem 1.5rem', borderRadius: '0.375rem', ...sx }}
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
