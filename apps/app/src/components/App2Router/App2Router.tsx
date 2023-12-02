import loadable from '@loadable/component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  PrivateRoute,
  Login,
  LoginPhone,
  LoginWhatsApp,
} from '@blockium/firebase';
import { LoadingPage } from '@blockium/ui-common';
import { CriatyLogo } from '@criaty/ui-custom';

import { App2 } from '../App2';

// 1. Dynamically import pages in order to optimize request time
const BusinessPage = loadable(() =>
  import('../../pages').then(({ BusinessPage }) => BusinessPage),
);
const CalendarPage = loadable(() =>
  import('../../pages').then(({ CalendarPage }) => CalendarPage),
);
const NoBusinessPage = loadable(() =>
  import('../../pages').then(({ NoBusinessPage }) => NoBusinessPage),
);
const PartnersPage = loadable(() =>
  import('../../pages').then(({ PartnersPage }) => PartnersPage),
);
const SettingsPage = loadable(() =>
  import('../../pages').then(({ SettingsPage }) => SettingsPage),
);
const WeeklyPostsPage = loadable(() =>
  import('../../pages').then(({ WeeklyPostsPage }) => WeeklyPostsPage),
);

// 2. Create a loading page
const Loading = () => (
  <LoadingPage
    logo={
      <CriatyLogo
        full={false}
        colorScheme="transparent-green-green-transparent"
        sx={{ marginTop: '0.75rem' }}
      />
    }
  />
);

export const App2Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 3. Define the main route using PrivateRoute wrapping the App2 */}
        <Route
          path="/"
          element={
            <PrivateRoute
              loginPath="/login"
              waitingAuth={<Loading />} // Loading while waiting for auth
            >
              {/* 4. Create the App2 with a react-router-dom Outlet within */}
              <App2 />
            </PrivateRoute>
          }
        >
          {/* 5. Create the sub-routes whose components will be within App2 */}
          <Route path="/" element={<CalendarPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/nobusiness" element={<NoBusinessPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/posts/weekly/:isoStartDate"
            element={<WeeklyPostsPage />}
          />
        </Route>
        {/* 6. Create the login route */}
        <Route
          path="/login"
          element={
            // 7. In the login component, define the login methods
            <Login
              loginMethods={['whatsapp', 'phone', 'google']}
              leftImageSrc="/images/login_768_1064.webp"
              topImageSrc="/images/login_1064_768.webp"
              newWhatsAppSessionApi={import.meta.env.VITE_NEW_SESSION_URL}
              loginWhatsAppPhone={import.meta.env.VITE_CRIATY_PHONE}
              afterEmailLoginApi={import.meta.env.VITE_AFTER_LOGIN_EMAIL_URL}
            />
          }
        />
        {/* 8. Create routes for each login method */}
        <Route
          path="/login-phone"
          element={
            <LoginPhone
              leftImageSrc="/images/login_768_1064.webp"
              topImageSrc="/images/login_1064_768.webp"
              afterLoginApi={import.meta.env.VITE_AFTER_LOGIN_PHONE_URL}
            />
          }
        />
        <Route
          path="/login-whatsapp"
          element={
            <LoginWhatsApp
              leftImageSrc="/images/login_768_1064.webp"
              topImageSrc="/images/login_1064_768.webp"
              afterLoginApi={import.meta.env.VITE_AFTER_LOGIN_WHATSAPP_URL}
              loginWhatsAppPhone={import.meta.env.VITE_CRIATY_PHONE}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App2Router;
