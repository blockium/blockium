import { useEffect, useRef, useState } from 'react';

// mui
import { Box } from '@mui/material';

// full calendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventInput, EventClickArg, DatesSetArg } from '@fullcalendar/core';
import './fullcalendar.css';

// TODO: I18N
import ptBRLocale from '@fullcalendar/core/locales/pt-br';

// utils
import { addDays } from 'date-fns';
// other
import { ScheduleHeader, ScheduleView } from './ScheduleHeader';
// import { renderEventContent } from './renderEventContent';
import { useCurrentDate } from '../hooks';

// const COLORS = [
//   "rgb(0, 171, 85)",
//   "rgb(24, 144, 255)",
//   "rgb(84, 214, 44)",
//   "rgb(255, 193, 7)",
//   "rgb(255, 72, 66)",
//   "rgb(4, 41, 122)",
//   "rgb(122, 12, 46)",
// ];

// const COLORS = [
//   '#00ab55', // green
//   '#188fff', // blue
//   '#54d62c', // lime
//   '#ffc107', // orange
//   '#ff4842', // red
//   '#04297a', // dark blue
//   '#7a0c2f', // dark red
// ];

type ScheduleViewerProps = {
  events: EventInput[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (id: string) => void;
  height?: number | string | object;
};

export const ScheduleViewer: React.FC<ScheduleViewerProps> = ({
  events,
  onDateClick,
  onEventClick,
  height,
}) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [dateState, setDateState] = useCurrentDate();
  const [calendarDate, setCalendarDate] = useState<Date>(
    new Date(dateState.getFullYear(), dateState.getMonth(), 1),
  );
  // changedDateState is true when dateState is changed from calendar
  // to avoid infinite dateState change
  const changedDateState = useRef(false);

  useEffect(() => {
    if (calendarRef.current && !changedDateState.current) {
      // dateState guard
      if (!dateState.getFullYear() || !dateState.getMonth()) {
        return;
      }

      const calendarApi = calendarRef.current.getApi();
      const date = calendarApi.getDate();
      if (
        date.getFullYear() !== dateState.getFullYear() ||
        date.getMonth() !== dateState.getMonth()
      ) {
        const newDate = new Date(
          dateState.getFullYear(),
          dateState.getMonth(),
          date.getDate(),
        );
        // if beginning of month and not first day of week
        if (
          calendarApi.view.type === 'timeGridWeek' &&
          newDate.getDate() < 7 &&
          newDate.getDay() !== 0
        ) {
          const newDate = new Date(
            dateState.getFullYear(),
            dateState.getMonth(),
            7,
          );
          calendarApi.gotoDate(newDate);
        } else {
          calendarApi.gotoDate(newDate);
        }
      }
    }
    changedDateState.current = false;
  }, [dateState]);

  const [currentView, setCurrentView] = useState<ScheduleView>('month');

  const handleDateClick = (clickInfo: DateClickArg) => {
    // If it is on month view, then goes to day view on selected date
    if (clickInfo.view.type === 'dayGridMonth') {
      const calendarApi = calendarRef.current?.getApi();
      calendarApi?.gotoDate(clickInfo.date);
      calendarApi?.changeView('timeGridDay');
      setCurrentView('day');
    } else {
      // Otherwise calls the correspondig function
      onDateClick?.(clickInfo.date);
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    onEventClick?.(clickInfo.event.id);
  };

  const changeMonthYear = async (newYear: number, newMonth: number) => {
    if (
      newYear !== dateState.getFullYear() ||
      newMonth !== dateState.getMonth()
    ) {
      changedDateState.current = true;
      setDateState(new Date(newYear, newMonth, 1));
    }
  };

  const onDatesSet = async (datesInfo: DatesSetArg) => {
    const { start, view } = datesInfo;
    if (view.type === 'dayGridMonth') {
      const date = addDays(start, 15); // be sure to be in middle of month
      const newYear = date.getFullYear();
      const newMonth = date.getMonth();
      await changeMonthYear(newYear, newMonth);
      setCalendarDate(new Date(newYear, newMonth, 1));
    } else {
      const newYear = start.getFullYear();
      const newMonth = start.getMonth();
      await changeMonthYear(newYear, newMonth);
      setCalendarDate(start);
    }
  };

  const onPrevClick = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.prev();
  };

  const onNextClick = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.next();
  };

  const onTodayClick = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.gotoDate(new Date());
  };

  const onMonthClick = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.changeView('dayGridMonth');
  };

  const onWeekClick = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.changeView('timeGridWeek');
  };

  const onDayClick = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.changeView('timeGridDay');
  };

  const onListClick = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.changeView('listWeek');
  };

  return (
    <Box sx={{ height: height || '100%', overflowY: 'auto' }}>
      <ScheduleHeader
        view={currentView}
        setView={setCurrentView}
        currentDate={calendarDate}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        onTodayClick={onTodayClick}
        onMonthClick={onMonthClick}
        onWeekClick={onWeekClick}
        onDayClick={onDayClick}
        onListClick={onListClick}
      />
      {/* <Box sx={{ minHeight: "720px", height: "80vh" }}> */}
      <Box sx={{ minHeight: '920px', height: '80vh' }}>
        <FullCalendar
          ref={calendarRef}
          locale={ptBRLocale}
          height="100%"
          nowIndicator
          dayMaxEvents={true}
          weekends={true} // TODO: Allow to show/hide weekends
          allDaySlot={false}
          // displayEventTime={false}
          headerToolbar={false}
          // headerToolbar={{
          //   left: "prev,next today",
          //   center: "title",
          //   right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          // }}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialDate={calendarDate}
          initialView="dayGridMonth"
          slotMinTime={'06:00:00'}
          slotMaxTime={'23:00:00'}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          datesSet={onDatesSet}
          // eventContent={renderEventContent}
        />
      </Box>
    </Box>
  );
};

export default ScheduleViewer;
