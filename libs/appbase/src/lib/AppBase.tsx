import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Container, Stack } from '@mui/material';

import { FirebaseConfig, initFirebase } from '@blockium/firebase';
import {
  PrivateRoute,
  Login,
  LoginPhone,
  LoginWhatsApp,
} from '@blockium/firebase';
import { ThemeConfig, ThemeProvider } from '@blockium/theme';
import { LoadingPage, LocalizationProvider } from '@blockium/ui-common';
import { DashboardLayout, LayoutConfig } from '@blockium/ui-mininal-tmpl';

interface RouteElement {
  path: string;
  element: ReactElement;
}

/* eslint-disable-next-line */
interface AppBaseProps {
  firebaseConfig: FirebaseConfig;
  themeConfig: ThemeConfig;
  layoutConfig: LayoutConfig;
  routeElements: RouteElement[];
  loadingLogo: ReactElement;
  loginLeftImageSrc: string;
  loginTopImageSrc?: string;
}

export const AppBase: React.FC<AppBaseProps> = ({
  firebaseConfig,
  themeConfig,
  layoutConfig,
  routeElements,
  loadingLogo,
  loginLeftImageSrc,
  loginTopImageSrc,
}) => {
  // 1. Initialize Firebase
  initFirebase(firebaseConfig);

  return (
    // 2. Customize theme
    <ThemeProvider config={themeConfig}>
      <BrowserRouter>
        <Routes>
          {/* 3. Define the main route using PrivateRoute wrapping the App  */}
          <Route
            path="/"
            element={
              <PrivateRoute
                loginPath="/login"
                waitingAuth={<LoadingPage logo={loadingLogo} />} // Loading while waiting for auth
              >
                {/* 4. Wrap the App with the LocalizationProvider */}
                <LocalizationProvider>
                  {/* 5. Wrap the App with the DashboardLayout passing the layout config */}
                  <DashboardLayout layoutConfig={layoutConfig}>
                    <Container maxWidth="lg" sx={{ margin: '0 auto' }}>
                      <Stack alignItems="center" gap="4rem"></Stack>
                      {/* 6. Add the react-router-dom Outlet */}
                      <Outlet />
                    </Container>
                  </DashboardLayout>
                </LocalizationProvider>
              </PrivateRoute>
            }
          >
            {/* 7. Create the sub-routes whose components will be within App */}
            {routeElements.map((routeElement, index) => (
              <Route {...routeElement} key={index} />
            ))}
          </Route>
          {/* 8. Create the login route */}
          <Route
            path="/login"
            element={
              // 9. In the login component, define the login methods
              <Login
                leftImageSrc={loginLeftImageSrc}
                topImageSrc={loginTopImageSrc || loginLeftImageSrc}
                loginWhatsApp="/login-whatsapp"
                loginPhone="/login-phone"
              />
            }
          />
          {/* 10. Create routes for each login method */}
          <Route
            path="/login-phone"
            element={
              <LoginPhone
                leftImageSrc={loginLeftImageSrc}
                topImageSrc={loginTopImageSrc || loginLeftImageSrc}
              />
            }
          />
          <Route
            path="/login-whatsapp"
            element={
              <LoginWhatsApp
                leftImageSrc={loginLeftImageSrc}
                topImageSrc={loginTopImageSrc || loginLeftImageSrc}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppBase;
