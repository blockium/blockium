import { PropsWithChildren, useEffect, useState } from 'react';
import { IntlProvider as BaseIntlProvider } from 'react-intl';

const translations: Record<
  string,
  () => Promise<{ default: { [key: string]: string } }>
> = {
  en: () => import('../../resources/en.json'),
  'pt-BR': () => import('../../resources/pt-BR.json'),
};

// Get user language with 2 characters
const userLang2 = navigator.language?.substring(0, 2);

// Get user language with 4 characters
let userLang4 = navigator.language;
if (userLang4.length > 2) {
  // Fix the country code to uppercase (in Safari on iOS prior to 10.2)
  userLang4 = userLang4.substring(0, 2) + userLang4.substring(2).toUpperCase();
}

const translationsForUsersLocale =
  translations[userLang4] || translations[userLang2] || translations['en'];

const usersLocale = translations[userLang4]
  ? userLang4
  : translations[userLang2]
  ? userLang2
  : 'en';

export function IntlProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState({});

  useEffect(() => {
    translationsForUsersLocale().then((data) => {
      setData(data.default);
    });
  }, []);

  return (
    <BaseIntlProvider
      defaultLocale="en"
      locale={usersLocale}
      messages={data}
      onError={() => {
        return;
      }}
    >
      {children}
    </BaseIntlProvider>
  );
}

export default IntlProvider;
