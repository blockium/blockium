// mui
import { Box } from '@mui/material';

// full calendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';

// other
import { useScheduler } from './useScheduler';
import { SchedulerHeader } from './SchedulerHeader';
import { SchedulerViewRoot } from './SchedulerViewRoot';
import { useIsMobile } from '../hooks';

// I18n
import { useTranslation } from 'react-i18next';
import ptBRLocale from '@fullcalendar/core/locales/pt-br';
const locales = {
  'pt-BR': ptBRLocale,
  // Add new locales here, using the i18next.language as the key
};
type LocaleKey = keyof typeof locales;

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
  height = '100%',
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
    handleNavLinkDayClick,
    handleDateClick,
    handleEventClick,
    onDatesSet,
  } = useScheduler({ onDateClick, onEventClick });
  const isMobile = useIsMobile();

  // I18n
  const { i18n } = useTranslation();
  const locale = locales[i18n.language as LocaleKey];

  return (
    <SchedulerViewRoot>
      <Box sx={{ height, overflowY: 'auto' }}>
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
        <Box sx={{ height: { xs: '90vh', sm: '70vh' } }}>
          <FullCalendar
            ref={calendarRef}
            locale={locale}
            height="100%"
            nowIndicator
            dayMaxEvents={true}
            // dayMaxEvents={3}
            weekends={true}
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
            navLinks
            navLinkDayClick={handleNavLinkDayClick}
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
