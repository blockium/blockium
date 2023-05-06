// import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from '@postgpt/i18n';
import { ThemeProvider } from '@postgpt/theme';

// import { App } from './components';
import { Login } from '@postgpt/commonui';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <StrictMode>
  <IntlProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Login />
        {/* <App /> */}
      </BrowserRouter>
    </ThemeProvider>
  </IntlProvider>
  // </StrictMode>
);
