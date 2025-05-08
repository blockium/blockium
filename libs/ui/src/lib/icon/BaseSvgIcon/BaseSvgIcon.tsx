import { styled } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material';

const IconRoot = styled('svg')(({ theme }) => ({
  // fill: theme.palette.secondary.main,
  // '&:hover': {
  //   fill: theme.palette.primary.main,
  // },
}));

export interface BaseSvgIconProps extends SvgIconProps {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  [key: string]: unknown;
}

export const BaseSvgIcon: React.FC<BaseSvgIconProps> = ({
  children,
  width = '1.87rem',
  height = '1.87rem',
  ...rest
}) => {
  return (
    <IconRoot
      width={width}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </IconRoot>
  );
};

export default BaseSvgIcon;
