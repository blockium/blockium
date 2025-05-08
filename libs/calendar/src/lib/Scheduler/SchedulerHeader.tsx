import { useTranslation } from 'react-i18next';
// mui
import {
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

import { CTAButton } from '@blockium/ui';

// utils
import { fDateCalendar, fDateCalendarShort } from '@blockium/utils';
import { TooltipToggleButton } from './TooltipToggleButton';
import { useIsSmall } from '../hooks';

import { SchedulerType } from './Scheduler';

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
  onAddClick?: () => void;
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
  onAddClick,
}) => {
  const theme = useTheme();
  const isSmall = useIsSmall();
  const { t } = useTranslation();

  const onViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: SchedulerType,
  ) => {
    setView(newView);
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item container alignItems="center" xs={3} md={4}>
        <Grid item>
          <Stack direction="row" gap={1}>
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
        </Grid>
        {!isSmall && onAddClick && (
          <Grid item>
            <CTAButton
              variant="contained"
              color="primary"
              onClick={onAddClick}
              sx={{
                px: theme.spacing(2),
                ml: theme.spacing(3),
                mr: theme.spacing(1),
              }}
            >
              {t('calendar:button.new')}
            </CTAButton>
          </Grid>
        )}
      </Grid>
      <Grid
        item
        container
        xs={6}
        md={4}
        justifyContent="center"
        alignItems="center"
        px="0.62rem"
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
      {isSmall && onAddClick && (
        <Grid item container justifyContent="flex-end" xs={3}>
          <Grid item>
            <CTAButton
              variant="contained"
              color="primary"
              onClick={onAddClick}
              sx={{ px: theme.spacing(2) }}
            >
              {t('calendar:button.new')}
            </CTAButton>
          </Grid>
        </Grid>
      )}
      <Grid
        item
        container
        xs={12}
        md={4}
        justifyContent={{ xs: 'center', md: 'flex-end' }}
        alignItems="center"
      >
        <Grid item>
          <CTAButton
            variant="contained"
            color="primary"
            onClick={onTodayClick}
            sx={{ px: theme.spacing(2), mr: theme.spacing(3) }}
          >
            {t('calendar:button.today')}
          </CTAButton>
        </Grid>
        <Grid item>
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
      </Grid>
    </Grid>
  );
};

export default SchedulerHeader;
