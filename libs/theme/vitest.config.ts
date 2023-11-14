import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './src/lib/locales/en/translation.json';

await i18next.use(initReactI18next).init({
  // debug: true,
  lng: 'en',
  resources: {
    en: {
      theme: en,
    },
  },
});

expect.extend(matchers);
