import { Theme } from '@mui/material';

export const createChatStyles = (theme: Theme) => {
  const { palette, spacing } = theme;

  const radius = spacing(2.5);
  // const size = spacing(4);
  const rightBgColor = palette.primary.main;
  // if you want the same as facebook messenger, use this color '#09f'
  return {
    avatar: {
      // width: size,
      // height: size,
    },
    leftRow: {
      textAlign: 'left',
    },
    rightRow: {
      textAlign: 'right',
    },
    msg: {
      padding: spacing(1, 2),
      borderRadius: radius,
      marginBottom: 0.5,
      display: 'inline-block',
      wordBreak: 'break-word',
      fontSize: '0.87rem',
    },
    left: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      backgroundColor: palette.grey[100],
      color: palette.grey[800],
    },
    right: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: rightBgColor,
      color: palette.common.white,
    },
    leftFirst: {
      borderTopLeftRadius: radius,
    },
    leftLast: {
      borderBottomLeftRadius: radius,
    },
    rightFirst: {
      borderTopRightRadius: radius,
    },
    rightLast: {
      borderBottomRightRadius: radius,
    },
  };
};
