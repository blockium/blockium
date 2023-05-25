// const translations: Record<
//   string,
//   () => Promise<{ default: { [key: string]: string } }>
// > = {
//   en: () => import('../../resources/en.json'),
//   'pt-BR': () => import('../../resources/pt-BR.json'),
// };

import en from '../../resources/en.json';
import ptBR from '../../resources/pt-BR.json';

const translations: { [key: string]: { [key: string]: string } } = {
  en: en,
  'pt-BR': ptBR,
};

// Get user language with 2 characters
const userLang2 = navigator.language?.substring(0, 2);

// Get user language with 4 characters
let userLang4 = navigator.language;
if (userLang4.length > 2) {
  // Fix the country code to uppercase (in Safari on iOS prior to 10.2)
  userLang4 = userLang4.substring(0, 2) + userLang4.substring(2).toUpperCase();
}

export const translationsForUsersLocale =
  translations[userLang4] || translations[userLang2] || translations['en'];

export const userLocale = translations[userLang4]
  ? userLang4
  : translations[userLang2]
  ? userLang2
  : 'en';
