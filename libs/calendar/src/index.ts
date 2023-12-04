import { addResourceBundles } from '@blockium/i18n';
import en from './lib/locales/en/translation.json';
import pt_BR from './lib/locales/pt-BR/translation.json';

addResourceBundles([
  { lng: 'en', ns: 'calendar', resources: en },
  { lng: 'pt-BR', ns: 'calendar', resources: pt_BR },
]);

export * from './lib/Calendar';
export * from './lib/hooks';
