import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { Route, Routes } from 'react-router-dom';

import { LoadingPage } from '@blockium/ui-common';
import { CriatyLogo } from '@criaty/ui-custom';

import { App } from '../App';
import {
  BusinessPage,
  CalendarPage,
  NoBusinessPage,
  PartnersPage,
  SettingsPage,
  WeeklyPostsPage,
} from '../../pages';

const PrivateRoute = loadable(() =>
  import('@blockium/firebase').then((module) => ({
    default: module.PrivateRoute,
  })),
);
const Login = loadable(() =>
  import('@blockium/firebase').then((module) => ({
    default: module.Login,
  })),
);
const LoginPhone = loadable(() =>
  pMinDelay(
    import('@blockium/firebase').then((module) => ({
      default: module.LoginPhone,
    })),
    200,
  ),
);
const LoginWhatsApp = loadable(() =>
  import('@blockium/firebase').then((module) => ({
    default: module.LoginWhatsApp,
  })),
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
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute loginPath="/login" loadingElement={<Loading />}>
            <App />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<CalendarPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/nobusiness" element={<NoBusinessPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        {/* <Route path="/customers" element={<CustomersPage />} /> */}
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
  );
};

export default AppRouter;
