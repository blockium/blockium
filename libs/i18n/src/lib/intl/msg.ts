import { createIntl, createIntlCache } from 'react-intl';
import { translationsForUsersLocale, usersLocale } from './translations';

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache();

// Create the `intl` object
const intl = createIntl(
  {
    locale: usersLocale,
    messages: translationsForUsersLocale,
  },
  cache
);

export function msg(id: string) {
  return intl.formatMessage({ id });
}
