// I18n
import i18next from 'i18next';
const locales = {
  'pt-BR': 'pt', // This string is used by Intl.Collator
  en: 'en',
  // Add new locales here, using the i18next.language as the key
};
type LocaleKey = keyof typeof locales;

export type Order = 'asc' | 'desc';

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const collator = new Intl.Collator(locales[i18next.language as LocaleKey]);
  if (typeof b[orderBy] === 'string') {
    return collator.compare(`${b[orderBy]}`, `${a[orderBy]}`);
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<T, Key extends keyof T>(
  order: Order,
  orderBy: Key,
): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
