import { PropsWithChildren } from 'react';
import { IntlProvider as BaseIntlProvider } from 'react-intl';

import { translationsForUsersLocale, userLocale } from '../intl/translations';

export function IntlProvider({ children }: PropsWithChildren) {
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   translationsForUsersLocale().then((data) => {
  //     setData(data.default);
  //   });
  // }, []);

  return (
    <BaseIntlProvider
      defaultLocale="en"
      locale={userLocale}
      // messages={data}
      messages={translationsForUsersLocale}
      onError={() => {
        return;
      }}
    >
      {children}
    </BaseIntlProvider>
  );
}

export default IntlProvider;
