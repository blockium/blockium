import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './components/App/App';

import { i18nInit } from '@blockium/i18n';
i18nInit();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <Suspense>
      <App />
    </Suspense>
    ,
  </StrictMode>,
);
