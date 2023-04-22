import { Route, Routes } from 'react-router-dom';
import Link from '@mui/material/Link';

import { useIntlMessage } from '@postgpt/i18n';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

export function App() {
  const msg = useIntlMessage();

  return (
    <>
      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <div role="navigation">
        <ul>
          <li>
            <Link href="/">{msg('app.home')}</Link>
          </li>
          <li>
            <Link href="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link href="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link href="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </>
  );
}

export default App;
