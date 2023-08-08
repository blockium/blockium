import { Route, Routes } from 'react-router-dom';

import { Login, LoginPhone, LoginWhatsApp } from '@postgpt/ui-auth';
import { PrivateRoute } from '@postgpt/ui-common';

import { App } from '../App';
import {
  BusinessPage,
  CalendarPage,
  SettingsPage,
  WeeklyPostsPage,
} from '../../pages';

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute loginPath="/login">
            <App />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<CalendarPage />} />
        <Route path="/business" element={<BusinessPage />} />
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
