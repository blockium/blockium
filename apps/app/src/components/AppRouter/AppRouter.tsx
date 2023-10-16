import loadable from '@loadable/component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoadingPage } from '@blockium/ui-common';
import { CriatyLogo } from '@criaty/ui-custom';

const App = loadable(() => import('../App').then(({ App }) => App));

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

const PrivateRoute = loadable(() =>
  import('@blockium/firebase').then(({ PrivateRoute }) => PrivateRoute),
);
const Login = loadable(() =>
  import('@blockium/firebase').then(({ Login }) => Login),
);
const LoginPhone = loadable(() =>
  import('@blockium/firebase').then(({ LoginPhone }) => LoginPhone),
);
const LoginWhatsApp = loadable(() =>
  import('@blockium/firebase').then(({ LoginWhatsApp }) => LoginWhatsApp),
);

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

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute
              loginPath="/login"
              waitingAuth={<Loading />} // Feedback waiting onAuthStateChanged
              fallback={<Loading />} // Feedback when lazy loading
            >
              <App />
            </PrivateRoute>
          }
        >
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
        <Route
          path="/login"
          element={
            <Login
              leftImageSrc="/images/login_768_1064.png"
              topImageSrc="/images/login_1064_768.png"
              loginWhatsApp="/login-whatsapp"
              loginPhone="/login-phone"
            />
          }
        />
        <Route
          path="/login-phone"
          element={
            <LoginPhone
              leftImageSrc="/images/login_768_1064.png"
              topImageSrc="/images/login_1064_768.png"
            />
          }
        />
        <Route
          path="/login-whatsapp"
          element={
            <LoginWhatsApp
              leftImageSrc="/images/login_768_1064.png"
              topImageSrc="/images/login_1064_768.png"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
