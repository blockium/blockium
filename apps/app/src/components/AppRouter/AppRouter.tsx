import { Route, Routes } from 'react-router-dom';

import { Login, LoginPhone, LoginWhatsApp } from '@postgpt/ui-auth';
import { PrivateRoute } from '@postgpt/ui-common';

import { App } from '../App';
import { WeeklyPosts, WeeklyPostsList } from '../post';

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
        <Route path="posts/weekly" element={<WeeklyPosts />} />
        <Route path="posts/weekly/list" element={<WeeklyPostsList />} />
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
