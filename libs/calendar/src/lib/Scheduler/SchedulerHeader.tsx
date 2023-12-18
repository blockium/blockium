import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const onViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: SchedulerType,
  ) => {
    setView(newView);
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item container xs={3} sm={4}>
        <Stack direction="row" spacing={0}>
          <Tooltip title={t('calendar:previous')}>
            <IconButton
              aria-label={t('calendar:previous')}
              onClick={onPrevClick}
              sx={{ color: theme.palette.text.secondary }}
            >
              <NavigateBeforeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('calendar:next')}>
            <IconButton
              aria-label={t('calendar:next')}
              onClick={onNextClick}
              sx={{ color: theme.palette.text.secondary }}
            >
              <NavigateNextIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={onTodayClick}
          sx={{ ml: 1 }}
        >
          {t('calendar:button.today')}
        </Button>
      </Grid>
      <Grid
        item
        container
        xs={8}
        sm={4}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h5"
          sx={{ textTransform: 'capitalize' }}
          textAlign="center"
        >
          {view === 'week' || view === 'list' ? `${t('calendar:start')} ` : ''}
          {currentDate &&
            (view === 'month'
              ? fDateCalendarShort(currentDate)
              : fDateCalendar(currentDate))}
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={1}
        justifyContent={{ xs: 'flex-end' }}
        alignItems="center"
        sx={{ display: { xs: 'flex', sm: 'none' } }}
      >
        <Tooltip title={compact ? t('calendar:expand') : t('calendar:compact')}>
          <IconButton
            aria-label={compact ? t('calendar:expand') : t('calendar:compact')}
            onClick={() => setCompact(!compact)}
            sx={{ color: theme.palette.text.secondary }}
          >
            {compact ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
        </Tooltip>
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
              TooltipProps={{ title: t('calendar:month') }}
              value="month"
              aria-label={t('calendar:month')}
              size="medium"
              onClick={onMonthClick}
              sx={{ color: theme.palette.text.secondary }}
            >
              <ViewModuleIcon width={24} height={24} />
            </TooltipToggleButton>
            <TooltipToggleButton
              TooltipProps={{ title: t('calendar:week') }}
              value="week"
              aria-label={t('calendar:week')}
              size="medium"
              onClick={onWeekClick}
              sx={{ color: theme.palette.text.secondary }}
            >
              <ViewWeekIcon width={24} height={24} />
            </TooltipToggleButton>
            <TooltipToggleButton
              TooltipProps={{ title: t('calendar:day') }}
              value="day"
              aria-label={t('calendar:day')}
              size="medium"
              onClick={onDayClick}
              sx={{ color: theme.palette.text.secondary }}
            >
              <ViewDayIcon width={24} height={24} />
            </TooltipToggleButton>
            {onListClick && (
              <TooltipToggleButton
                TooltipProps={{ title: t('calendar:list') }}
                value="list"
                aria-label={t('calendar:list')}
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
