import { Route, Routes } from 'react-router-dom';

import { Login, LoginWhatsApp, PrivateRoute } from '@postgpt/commonui';

import App from '../App/App';
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
