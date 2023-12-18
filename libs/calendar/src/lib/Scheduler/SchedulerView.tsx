// mui
import { Box } from '@mui/material';

// full calendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';

// TODO: I18N
import ptBRLocale from '@fullcalendar/core/locales/pt-br';

// other
import { useScheduler } from './useScheduler';
import { SchedulerHeader } from './SchedulerHeader';
import { SchedulerViewRoot } from './SchedulerViewRoot';
import { useIsMobile } from '../hooks';
// import { renderEventContent } from './renderEventContent';

type SchedulerViewProps = {
  events: EventInput[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (id: string) => void;
  height?: number | string | object;
};

export const SchedulerView: React.FC<SchedulerViewProps> = ({
  events,
  onDateClick,
  onEventClick,
  height,
}) => {
  const {
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
  } = useScheduler({ onDateClick, onEventClick });
  const isMobile = useIsMobile();

  return (
    <SchedulerViewRoot>
      <Box sx={{ height: height || '100%', overflowY: 'auto' }}>
        <SchedulerHeader
          view={currentView}
          setView={setCurrentView}
          currentDate={schedulerDate}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          onTodayClick={onTodayClick}
          onMonthClick={onMonthClick}
          onWeekClick={onWeekClick}
          onDayClick={onDayClick}
          onListClick={onListClick}
        />
        {/* <Box sx={{ minHeight: "720px", height: "80vh" }}> */}
        <Box sx={{ height: '80vh' }}>
          <FullCalendar
            ref={calendarRef}
            locale={ptBRLocale}
            height="100%"
            nowIndicator
            dayMaxEvents={true}
            weekends={true} // TODO: Allow to show/hide weekends
            allDaySlot={false}
            displayEventTime={!isMobile}
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
            initialDate={schedulerDate}
            initialView="dayGridMonth"
            // slotMinTime={'06:00:00'}
            // slotMaxTime={'23:00:00'}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            datesSet={onDatesSet}
            // eventContent={renderEventContent}
          />
        </Box>
      </Box>
    </SchedulerViewRoot>
  );
};

export default SchedulerView;
