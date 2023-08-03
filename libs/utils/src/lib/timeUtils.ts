import {
  differenceInCalendarYears,
  format,
  formatDistanceToNow,
  formatRelative,
  getDay,
  getDaysInMonth,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatRelativeLocale: object = {
  lastWeek: "eeee 'que passou'",
  yesterday: "'Ontem'",
  today: "'Hoje'",
  tomorrow: "'Amanhã'",
  nextWeek: 'eeee',
  other: "dd 'de' MMM",
};

const locale = {
  ...ptBR,
  formatRelative: (token: keyof typeof formatRelativeLocale) =>
    formatRelativeLocale[token],
};
// ----------------------------------------------------------------------

export function fDate(date: string | number | Date): string {
  return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
  // return format(new Date(date), "dd MMMM yyyy");
}

export function fDateCalendar(date: string | number | Date): string {
  return format(new Date(date), 'dd MMM yyyy', { locale: ptBR });
}

export function fDateCalendarShort(date: string | number | Date): string {
  return format(new Date(date), 'd.MM', { locale: ptBR });
}

export function fTime(date: string | number | Date): string {
  return format(new Date(date), 'HH:mm', { locale: ptBR });
  // return format(new Date(date), "dd MMMM yyyy");
}

export function fDateTime(date: string | number | Date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm', { locale: ptBR });
}

export function fDateTime2(date: string | number | Date) {
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: ptBR });
}

export function fDateTimeSuffix(date: string | number | Date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p', { locale: ptBR });
}

export function fToNow(date: string | number | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ptBR,
  });
}

const formatter = new Intl.RelativeTimeFormat('pt-BR', {
  numeric: 'auto',
  style: 'long',
});

export function fBirthday(birthday: string | number | Date) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const date = new Date(birthday);
  date.setHours(0, 0, 0, 0);
  date.setFullYear(now.getFullYear());

  return formatRelative(new Date(date), now, {
    locale,
  });
}

export function fBirthday2(birthday: string | number | Date) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const date = new Date(birthday);
  date.setHours(0, 0, 0, 0);
  date.setFullYear(now.getFullYear());

  const diff = date.getTime() - now.getTime();
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (days > -7 && days < 7) return formatter.format(days, 'days');
  else {
    const weeks = days / 7;
    if (weeks > -4 && weeks < 4)
      return formatter.format(Math.floor(weeks), 'weeks');
    else {
      const months = weeks / 4;
      return formatter.format(
        // TODO: REVIEW
        Math.floor(months > -6 ? months : -(months + 6)),
        'months',
      );
    }
  }
}

export function fAge(birthday: string | number | Date) {
  const now = new Date();
  const diff = differenceInCalendarYears(now, new Date(birthday));
  return `${diff} ${diff > 1 ? 'anos' : 'ano'}`;
}

// Return the number of days in the week until end of month
export function getDaysInWeekOfMonth(date: Date) {
  const weekDay = getDay(date);
  // Examples:
  // Mon -> weekDay = 1 - return 7
  // Tue -> weekDay = 2 - return 6
  // Wed -> weekDay = 3 - return 5
  // Thu -> weekDay = 4 - return 4
  // Frd -> weekDay = 5 - return 3
  // Sat -> weekDay = 6 - return 2
  // Sun -> weekDay = 0 - return 1
  const remainingDaysInWeek = 8 - (weekDay > 0 ? weekDay : 7);

  const day = date.getDate();
  const remainingDaysInMonth = getDaysInMonth(date) - day + 1;
  // If last week uses only the remaining days in month

  return Math.min(remainingDaysInWeek, remainingDaysInMonth);
}
