import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

// Date configurarion for MUI Date Picker
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enUS as enUSMui, ptBR as ptBRMui } from '@mui/x-date-pickers/locales';

import { Locale } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';

const dateFnsLocales: { [key: string]: Locale } = {
  'en-US': enUS,
  'pt-BR': ptBR,
};

export const LocalizationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { i18n } = useTranslation();

  const userLocale = i18n.language === 'pt-BR' ? 'pt-BR' : 'en-US';

  const dateFnsLocale = dateFnsLocales[userLocale] || dateFnsLocales['en-US'];

  const muiLocales: { [key: string]: typeof enUSMui } = {
    'en-US': enUSMui,
    'pt-BR': ptBRMui,
  };

  const muiLocale = muiLocales[userLocale] || muiLocales['en-US'];

  return (
    <MuiLocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={dateFnsLocale}
      localeText={
        muiLocale.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      {children}
    </MuiLocalizationProvider>
  );
};

export default LocalizationProvider;
