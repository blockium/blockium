import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { IntlProvider } from '@postgpt/i18n';
import { ThemeProvider } from '@postgpt/theme';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <IntlProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </IntlProvider>
  </StrictMode>
);
