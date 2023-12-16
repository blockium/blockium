import { Card, Container, useTheme } from '@mui/material';
import { EventInput } from '@fullcalendar/core';
import { addHours, addMinutes } from 'date-fns';

import { ScheduleViewer } from '@blockium/calendar';

import jsonData from './customerServices.json';
import { ICustomerService } from '../../types';

export interface IScheduleProps {
  children?: React.ReactNode;
}

export const Schedule: React.FC<IScheduleProps> = (props) => {
  const theme = useTheme();

  const rawData: ICustomerService[] = jsonData;

  const getPartnerColor = (partnerEmail: string | undefined) => {
    // const partner = partners.find(
    //   (partner) =>
    //     partner.email.toLowerCase() === partnerEmail?.toLowerCase(),
    // );
    // return partner?.color;
    return theme.palette.primary.main;
  };

  const events: EventInput[] = rawData.map((cs) => {
    const startDate = new Date(cs.serviceDate);
    const duration = cs.duration ? new Date(cs.duration) : null;
    // Compute endDate based on duration
    const endDate = duration
      ? addMinutes(
          addHours(startDate, duration.getHours()),
          duration.getMinutes(),
        )
      : addHours(startDate, 1);
    const event: EventInput = {
      id: cs.id,
      title: `${cs.customerName} (${cs.serviceName})`,
      start: cs.serviceDate,
      end: endDate.toJSON(),
      backgroundColor:
        getPartnerColor(cs.partnerEmail) || theme.palette.primary.main,
      borderColor:
        getPartnerColor(cs.partnerEmail) || theme.palette.primary.main,
      display: 'block',
      extendedProps: cs,
    };
    return event;
  });

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: theme.spacing(10) }}>
      <Card>
        <ScheduleViewer events={events} />
      </Card>
    </Container>
  );
};

export default Schedule;
