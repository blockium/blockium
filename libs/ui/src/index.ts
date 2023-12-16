import { addResourceBundles } from '@blockium/i18n';
import en from './lib/locales/en/translation.json';
import pt_BR from './lib/locales/pt-BR/translation.json';

// Load custom @mui/material types
import '@blockium/theme';

addResourceBundles([
  { lng: 'en', ns: 'ui', resources: en },
  { lng: 'pt-BR', ns: 'ui', resources: pt_BR },
]);

export * from './lib/alert';
export * from './lib/button';
export * from './lib/dialog';
export * from './lib/form';
export * from './lib/hero';
export * from './lib/icon';
export * from './lib/progress';
export * from './lib/stepper';
export * from './lib/utils';
export * from './lib/widget';
