import { useState } from 'react';
// mui
import {
  Button,
  Grid,
  IconButton,
  Stack,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { NavigateBefore as NavigateBeforeIcon } from '@mui/icons-material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { ViewModule as ViewModuleIcon } from '@mui/icons-material';
import { ViewWeek as ViewWeekIcon } from '@mui/icons-material';
import { ViewDay as ViewDayIcon } from '@mui/icons-material';
import { ViewAgenda as ViewAgendaIcon } from '@mui/icons-material';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';

// utils
import { fDateCalendar, fDateCalendarShort } from '@blockium/utils';
import { TooltipToggleButton } from './TooltipToggleButton';
import { useIsMobile } from '../hooks';

import { SchedulerType } from './Scheduler';

// TODO i18n

type SchedulerHeaderProps = {
  view: SchedulerType;
  setView: (view: SchedulerType) => void;
  currentDate?: Date;
  onPrevClick: () => void;
  onNextClick: () => void;
  onTodayClick: () => void;
  onMonthClick: () => void;
  onWeekClick: () => void;
  onDayClick: () => void;
  onListClick?: () => void;
};

export const SchedulerHeader: React.FC<SchedulerHeaderProps> = ({
  view,
  setView,
  currentDate,
  onPrevClick,
  onNextClick,
  onTodayClick,
  onMonthClick,
  onWeekClick,
  onDayClick,
  onListClick,
}) => {
  const theme = useTheme();
  const [compact, setCompact] = useState(true);
  const isMobile = useIsMobile();

  const onViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: SchedulerType,
  ) => {
    setView(newView);
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid
        item
        container
        xs={10}
        sm={4}
        justifyContent={{ xs: 'space-between', sm: 'flex-start' }}
        alignItems="center"
      >
        <Stack direction="row" spacing={0}>
          <Tooltip title="Anterior">
            <IconButton
              aria-label="Anterior"
              onClick={onPrevClick}
              sx={{ color: theme.palette.text.secondary }}
            >
              <NavigateBeforeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Próximo">
            <IconButton
              aria-label="Próximo"
              onClick={onNextClick}
              sx={{ color: theme.palette.text.secondary }}
            >
              <NavigateNextIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack
          sx={{
            display: { xs: 'block', sm: 'none' },
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ textTransform: 'capitalize' }}
          >
            {view === 'week' || view === 'list' ? 'Início: ' : ''}
            {currentDate &&
              (view === 'month'
                ? fDateCalendarShort(currentDate)
                : fDateCalendar(currentDate))}
          </Typography>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={onTodayClick}
          sx={{ ml: 1 }}
        >
          Hoje
        </Button>
      </Grid>
      <Grid
        item
        container
        xs={2}
        justifyContent={{ xs: 'flex-end' }}
        alignItems="center"
        sx={{ display: { xs: 'flex', sm: 'none' } }}
      >
        <Tooltip title={compact ? 'Expandir' : 'Compactar'}>
          <IconButton
            aria-label={compact ? 'Expandir' : 'Compactar'}
            onClick={() => setCompact(!compact)}
            sx={{ color: theme.palette.text.secondary }}
          >
            {compact ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={4}
        justifyContent="center"
        alignItems="center"
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        <Typography
          variant="h5"
          // color="initial"
          sx={{ textTransform: 'capitalize' }}
          textAlign="center"
        >
          {view === 'week' || view === 'list' ? 'Início: ' : ''}
          {currentDate &&
            (view === 'month'
              ? fDateCalendarShort(currentDate)
              : fDateCalendar(currentDate))}
        </Typography>
      </Grid>
      {(!isMobile || !compact) && (
        <Grid
          item
          container
          xs={12}
          sm={4}
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
        >
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={onViewChange}
            aria-label="view"
          >
            <TooltipToggleButton
              TooltipProps={{ title: 'Mês' }}
              value="month"
              aria-label="Mês"
              size="medium"
              onClick={onMonthClick}
              sx={{ color: theme.palette.text.secondary }}
            >
              <ViewModuleIcon width={24} height={24} />
            </TooltipToggleButton>
            <TooltipToggleButton
              TooltipProps={{ title: 'Semana' }}
              value="week"
              aria-label="Semana"
              size="medium"
              onClick={onWeekClick}
              sx={{ color: theme.palette.text.secondary }}
            >
              <ViewWeekIcon width={24} height={24} />
            </TooltipToggleButton>
            <TooltipToggleButton
              TooltipProps={{ title: 'Dia' }}
              value="day"
              aria-label="Dia"
              size="medium"
              onClick={onDayClick}
              sx={{ color: theme.palette.text.secondary }}
            >
              <ViewDayIcon width={24} height={24} />
            </TooltipToggleButton>
            {onListClick && (
              <TooltipToggleButton
                TooltipProps={{ title: 'Lista' }}
                value="list"
                aria-label="Lista"
                size="medium"
                onClick={onListClick}
                sx={{ color: theme.palette.text.secondary }}
              >
                <ViewAgendaIcon width={24} height={24} />
              </TooltipToggleButton>
            )}
          </ToggleButtonGroup>
        </Grid>
      )}
    </Grid>
  );
};

export default SchedulerHeader;
