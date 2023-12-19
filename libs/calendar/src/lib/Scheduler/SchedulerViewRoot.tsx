// mui
import { alpha, styled } from '@mui/material';

export const SchedulerViewRoot = styled('div')(({ theme }) => ({
  width: 'calc(100% + 2px)',
  marginLeft: -1,
  marginBottom: -1,

  '& .fc': {
    '--fc-border-color': alpha(theme.palette.grey[500], 0.16),
    '--fc-now-indicator-color': theme.palette.error.main,
    '--fc-today-bg-color': alpha(theme.palette.grey[500], 0.08),
    '--fc-page-bg-color': theme.palette.background.default,
    '--fc-neutral-bg-color': theme.palette.background.neutral,
    '--fc-list-event-hover-bg-color': theme.palette.action.hover,
    '--fc-highlight-color': theme.palette.action.hover,
  },

  '& .fc-theme-standard .fc-scrollgrid': {
    border: '0px',
  },

  '& .fc .fc-col-header': {
    '.fc-col-header-cell-cushion': {
      textTransform: 'capitalize',
      // padding: '8px 0px',
    },

    th: {
      borderLeft: '0px',
      borderRight: '0px',
    },
  },

  '& .fc .fc-daygrid-day-number': {
    // padding: '8px 8px 0px',
  },

  '& .fc-h-event': {
    cursor: 'pointer',

    '.fc-event-title': {
      // textOverflow: 'ellipsis',
    },

    '.fc-event-time': {
      fontSize: 8,
      minWidth: '16px',
      marginRight: 0,
      // flexShrink: 0 /* Sets width to text length */,
      // '&:after': {
      //   content: '"h"',
      // },
    },

    '.fc-event-main:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  },

  // Reduce the header font size on mobile
  [theme.breakpoints.down('sm')]: {
    '& .fc .fc-col-header': {
      '.fc-col-header-cell-cushion': {
        fontSize: '1rem',
      },
    },
  },
}));
