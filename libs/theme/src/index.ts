import { addResourceBundles } from '@blockium/i18n';
import en from './lib/locales/en/translation.json';
import pt_BR from './lib/locales/pt-BR/translation.json';

addResourceBundles([
  { lng: 'en', ns: 'theme', resources: en },
  { lng: 'pt-BR', ns: 'theme', resources: pt_BR },
]);

export * from './lib/colors';
export * from './lib/palette';
export * from './lib/theme';
export * from './lib/ui';
