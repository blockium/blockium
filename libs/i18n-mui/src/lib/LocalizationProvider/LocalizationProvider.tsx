import { PropsWithChildren } from 'react';

// Date configurarion for MUI Date Picker
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enUS as enUSMui, ptBR as ptBRMui } from '@mui/x-date-pickers/locales';

import enUS from 'date-fns/locale/en-US';
import ptBR from 'date-fns/locale/pt-BR';
import { Locale } from 'date-fns';

import { userLocale } from '@blockium/i18n';

const dateFnsLocales: { [key: string]: Locale } = {
  'en-US': enUS,
  'pt-BR': ptBR,
};

const dateFnsLocale = dateFnsLocales[userLocale] || dateFnsLocales['en-US'];

const muiLocales: { [key: string]: typeof enUSMui } = {
  'en-US': enUSMui,
  'pt-BR': ptBRMui,
};

const muiLocale = muiLocales[userLocale] || muiLocales['en-US'];

export const LocalizationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
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
