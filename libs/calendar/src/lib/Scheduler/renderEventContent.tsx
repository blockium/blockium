import { Box, Typography } from '@mui/material';
import { EventContentArg } from '@fullcalendar/core';
import { fTime } from '@blockium/utils';

export const renderEventContent = (eventInfo: EventContentArg) => {
  const { event } = eventInfo;
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: eventInfo.backgroundColor,
        // border: 1,
        borderColor: (theme) => theme.palette.grey[400],
        borderRadius: '0.3em',
        px: '0.5em',
      }}
    >
      <Typography variant="caption" color="inherit" fontWeight={100}>
        <p>
          <b>{event.title}</b>
        </p>
        {event.start && fTime(event.start)} - {event.end && fTime(event.end)}
      </Typography>
    </Box>
    // <MenuItem sx={{ bgcolor: eventInfo.backgroundColor }}>
    //   <Typography variant="caption" fontWeight={100}>
    //     <p>
    //       <b>{event.title}</b>
    //     </p>
    //     {event.start && fTime(event.start)}
    //   </Typography>
    // </MenuItem>
    // <Button>
    //   <b>{eventInfo.timeText}</b>
    //   <i>{eventInfo.event.title}</i>
    // </Button>
  );
};

export default renderEventContent;
