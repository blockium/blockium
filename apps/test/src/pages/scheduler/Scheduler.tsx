import { Card, Container, useTheme } from '@mui/material';
import { EventInput } from '@fullcalendar/core';
import { addHours, addMinutes } from 'date-fns';

import { SchedulerView } from '@blockium/calendar';

import jsonData from './customerServices.json';
import { ICustomerService } from '../../types';

const COLORS = [
  'rgb(0, 171, 85)',
  'rgb(24, 144, 255)',
  'rgb(84, 214, 44)',
  'rgb(255, 193, 7)',
  'rgb(255, 72, 66)',
  'rgb(4, 41, 122)',
  'rgb(122, 12, 46)',
];

// const COLORS = [
//   '#00ab55', // green
//   '#188fff', // blue
//   '#54d62c', // lime
//   '#ffc107', // orange
//   '#ff4842', // red
//   '#04297a', // dark blue
//   '#7a0c2f', // dark red
// ];

export interface IScheduleProps {
  children?: React.ReactNode;
}

export const Scheduler: React.FC<IScheduleProps> = (props) => {
  const theme = useTheme();

  const rawData: ICustomerService[] = jsonData;

  const getPartnerColor = (partnerEmail: string | undefined) => {
    // const partner = partners.find(
    //   (partner) =>
    //     partner.email.toLowerCase() === partnerEmail?.toLowerCase(),
    // );
    // return partner?.color;
    return COLORS[Number.parseInt(Math.random() * 5 + '')];
    // return theme.palette.primary.main;
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
    const color =
      getPartnerColor(cs.partnerEmail) || theme.palette.primary.main;
    const event: EventInput = {
      id: cs.id,
      title: `${cs.customerName} (${cs.serviceName})`,
      start: cs.serviceDate,
      end: endDate.toJSON(),
      backgroundColor: color,
      borderColor: color,
      display: 'block',
      extendedProps: cs,
    };
    return event;
  });

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: theme.spacing(10) }}>
      <Card>
        <SchedulerView events={events} />
      </Card>
    </Container>
  );
};

export default Scheduler;
