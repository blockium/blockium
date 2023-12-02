import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Container, Stack } from '@mui/material';

import {
  FirebaseConfig,
  initFirebase,
  useLayoutConfig,
} from '@blockium/firebase';
import {
  PrivateRoute,
  Login,
  LoginPhone,
  LoginWhatsApp,
} from '@blockium/firebase';
import { ThemeConfig, ThemeProvider } from '@blockium/theme';
import { LoadingPage, LocalizationProvider } from '@blockium/ui-common';
import { DashboardLayout, LayoutConfig } from '@blockium/ui-mininal-tmpl';

type RouteElement = {
  path: string;
  element: ReactElement | (() => ReactElement);
};

type LoginMethod = 'phone' | 'whatsapp' | 'email' | 'google';

interface AppBaseProps {
  firebaseConfig: FirebaseConfig;
  themeConfig: ThemeConfig;
  layoutConfig: LayoutConfig;
  routeElements: RouteElement[];
  openRouteElements?: RouteElement[];
  loadingLogo: ReactElement;
  appLogo: ReactElement;
  appLogoDark?: ReactElement;
  loginMethods: LoginMethod[];
  loginLeftImageSrc: string;
  loginTopImageSrc?: string;
  newWhatsAppSessionApi?: string;
  loginWhatsAppPhone?: string;
  afterWhatsAppLoginApi?: string;
  afterEmailLoginApi?: string;
  afterPhoneLoginApi?: string;
}

interface AppLayoutProps {
  layoutConfig: LayoutConfig;
  appLogo: ReactElement;
  appLogoDark?: ReactElement;
}

// It's necessary to wrap the useLayoutConfig hook in a component
// Because it requires the ThemeProvider context
const AppLayout: React.FC<AppLayoutProps> = ({
  layoutConfig,
  appLogo,
  appLogoDark,
}) => {
  const layoutConfigExtended = useLayoutConfig({
    layoutConfig,
    AppLogo: appLogo,
    AppLogoDark: appLogoDark,
  });

  return (
    <DashboardLayout layoutConfig={layoutConfigExtended}>
      <Container maxWidth="lg" sx={{ margin: '0 auto' }}>
        <Stack alignItems="center" gap="4rem"></Stack>
        {/* 6. Add the react-router-dom Outlet */}
        <Outlet />
      </Container>
    </DashboardLayout>
  );
};

// AppBase is the base component of the app. It is responsible for:
// 1. Initializing Firebase
// 2. Customizing the theme
// 3. Defining the main route using PrivateRoute wrapping the App
// 4. Wrapping the App with the LocalizationProvider
// 5. Wrapping the App with the DashboardLayout passing the layout config
// 6. Adding the react-router-dom Outlet
// 7. Creating the sub-routes whose components will be within App
// 8. Creating the login route
// 9. In the login component, defining the login methods
// 10. Creating routes for each login method
// 11. Create open routes
//
// Functionalities:
// - Customizable Login Methods: phone, whatsapp, google and email (soon).
// - Customizable Routes
// - User Authorization Control for private routes
// - Internationalization
// - Customizable Theme
// - Customizable Layout
// - Customizable Loading Page
// - Light and Dark Mode
// - High Level New UI Components (Heros, Dialogs, Forms, Tables, Charts, etc.)
// - Low Level New UI Components (Buttons, Inputs, etc.)
// - Simplified Rich Forms (soon)
//
export const AppBase: React.FC<AppBaseProps> = ({
  firebaseConfig,
  themeConfig,
  layoutConfig,
  routeElements,
  openRouteElements,
  loadingLogo,
  appLogo,
  appLogoDark,
  loginMethods,
  loginLeftImageSrc,
  loginTopImageSrc,
  newWhatsAppSessionApi,
  loginWhatsAppPhone,
  afterWhatsAppLoginApi,
  afterEmailLoginApi,
  afterPhoneLoginApi,
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
                  {/* 5. In AppLayout, wrap the App with the DashboardLayout passing the layout config */}
                  {/* 6. In AppLayout, add the react-router-dom Outlet */}
                  <AppLayout
                    layoutConfig={layoutConfig}
                    appLogo={appLogo}
                    appLogoDark={appLogoDark}
                  />
                </LocalizationProvider>
              </PrivateRoute>
            }
          >
            {/* 7. Create private routes whose components will be within App */}
            {routeElements.map(({ path, element }, index) => (
              <Route
                path={path}
                element={typeof element === 'function' ? element() : element}
                key={index}
              />
            ))}
          </Route>
          {/* 8. Create the login route */}
          <Route
            path="/login"
            element={
              // 9. In the login component, define the login methods
              <Login
                loginMethods={loginMethods}
                leftImageSrc={loginLeftImageSrc}
                topImageSrc={loginTopImageSrc || loginLeftImageSrc}
                newWhatsAppSessionApi={newWhatsAppSessionApi}
                loginWhatsAppPhone={loginWhatsAppPhone}
                afterEmailLoginApi={afterEmailLoginApi}
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
                afterLoginApi={afterPhoneLoginApi}
              />
            }
          />
          <Route
            path="/login-whatsapp"
            element={
              <LoginWhatsApp
                leftImageSrc={loginLeftImageSrc}
                topImageSrc={loginTopImageSrc || loginLeftImageSrc}
                afterLoginApi={afterWhatsAppLoginApi}
                loginWhatsAppPhone={loginWhatsAppPhone}
              />
            }
          />
          {/* 11. Create open routes without layouts */}
          {openRouteElements?.map(({ path, element }, index) => (
            <Route
              path={path}
              element={typeof element === 'function' ? element() : element}
              key={index}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppBase;
