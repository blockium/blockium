import { addResourceBundles } from '@blockium/i18n';
import en from './lib/locales/en/translation.json';
import pt_BR from './lib/locales/pt-BR/translation.json';

// Load custom @mui/material types
import '@blockium/theme';

addResourceBundles([
  { lng: 'en', ns: 'form', resources: en },
  { lng: 'pt-BR', ns: 'form', resources: pt_BR },
]);

export * from './lib';
