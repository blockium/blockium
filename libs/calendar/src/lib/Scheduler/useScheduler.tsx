import { useEffect, useRef, useState } from 'react';
// Full Calendar
import FullCalendar from '@fullcalendar/react';
import { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg, DatesSetArg } from '@fullcalendar/core';
// utils
import { addDays } from 'date-fns';
// other
import { SchedulerType } from './Scheduler';
import { useCurrentDate } from '../hooks';

type SchedulerProps = {
  onDateClick?: (date: Date) => void;
  onEventClick?: (id: string) => void;
};

export const useScheduler = ({ onDateClick, onEventClick }: SchedulerProps) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [dateState, setDateState] = useCurrentDate();
  const [schedulerDate, setSchedulerDate] = useState<Date>(
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

  const [currentView, setCurrentView] = useState<SchedulerType>('month');

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
      setSchedulerDate(new Date(newYear, newMonth, 1));
    } else {
      const newYear = start.getFullYear();
      const newMonth = start.getMonth();
      await changeMonthYear(newYear, newMonth);
      setSchedulerDate(start);
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

  return {
    calendarRef,
    currentView,
    setCurrentView,
    schedulerDate,
    onPrevClick,
    onNextClick,
    onTodayClick,
    onMonthClick,
    onWeekClick,
    onDayClick,
    onListClick,
    handleDateClick,
    handleEventClick,
    onDatesSet,
  };
};
