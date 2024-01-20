import { ReactElement, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import './styles.scss';

import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from './Fallback';

import {
  FirebaseConfig,
  initFirebase,
  useAuthLayoutConfig,
} from '@blockium/firebase';
import {
  PrivateRoute,
  Login,
  LoginPhone,
  LoginWhatsApp,
} from '@blockium/firebase';
import { ThemeConfig, ThemeProvider } from '@blockium/theme';
import { LoadingPage, NotistackProvider } from '@blockium/ui';
import { LocalizationProvider } from '@blockium/calendar';
import { MainLayout, LayoutConfig } from '@blockium/layout';

import { i18nInit } from '@blockium/i18n';
i18nInit();

type RouteElement = {
  path: string;
  element: ReactElement | (() => ReactElement);
};

type LoginMethod = 'phone' | 'whatsapp' | 'email' | 'google';

export interface AuthConfig {
  config?: FirebaseConfig;
  loginMethods?: LoginMethod[];
  leftImage?: string;
  topImage?: string;
  zapNewSessionApi?: string;
  zapLoginPhone?: string;
  afterEmailLoginApi?: string;
  afterPhoneLoginApi?: string;
  afterWhatsAppLoginApi?: string;
  onAfterLogin?: () => Promise<void>;
}

type AppLayoutProps = {
  layoutConfig?: LayoutConfig;
};

// It's necessary to wrap the useAuthLayoutConfig hook in a component
// Because it requires the ThemeProvider context
const AppLayout: React.FC<AppLayoutProps> = ({ layoutConfig }) => {
  const layoutConfigExtended = useAuthLayoutConfig({ layoutConfig });

  return (
    <MainLayout layoutConfig={layoutConfigExtended}>
      <Container maxWidth={false} sx={{ margin: '0 auto' }}>
        {/* 6. Add the react-router-dom Outlet */}
        <Outlet />
      </Container>
    </MainLayout>
  );
};

type AppBaseProps = {
  authConfig?: AuthConfig;
  themeConfig?: ThemeConfig;
  layoutConfig?: LayoutConfig;
  routeElements: RouteElement[];
  openRouteElements?: RouteElement[];
};

// AppBase is the base component of the app. It is responsible for:
// 1. Initializing Firebase
// 2. Customizing the theme
// 3. Defining the main route using PrivateRoute wrapping the App
// 4. Wrapping the App with the LocalizationProvider
// 5. Wrapping the App with the MainLayout passing the layout config
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
  authConfig,
  themeConfig,
  layoutConfig,
  routeElements,
  openRouteElements,
}) => {
  // 1. Initialize Firebase
  if (authConfig?.config) {
    initFirebase(authConfig.config);
  } else {
    const defaultFirebaseConfig = {
      apiKey:
        document.location.hostname === 'localhost'
          ? import.meta.env['VITE_FIREBASE_API_KEY_DEV']
          : import.meta.env['VITE_FIREBASE_API_KEY'],
      authDomain: import.meta.env['VITE_FIREBASE_AUTH_DOMAIN'],
      projectId: import.meta.env['VITE_FIREBASE_PROJECT_ID'],
      storageBucket: import.meta.env['VITE_FIREBASE_STORAGE_BUCKET'],
      messagingSenderId: import.meta.env['VITE_FIREBASE_MESSAGING_SENDER_ID'],
      appId: import.meta.env['VITE_FIREBASE_APP_ID'],
      measurementId: import.meta.env['VITE_FIREBASE_MEASUREMENT_ID'],
    };
    initFirebase(defaultFirebaseConfig);
  }

  const {
    loginMethods,
    leftImage,
    topImage,
    zapNewSessionApi,
    zapLoginPhone,
    afterEmailLoginApi,
    afterPhoneLoginApi,
    afterWhatsAppLoginApi,
    onAfterLogin,
  } = authConfig || {};

  return (
    <Suspense>
      {/* // 2. Customize theme */}
      <ThemeProvider config={themeConfig}>
        <NotistackProvider>
          <ErrorBoundary fallbackRender={Fallback}>
            <BrowserRouter>
              <Routes>
                {/* 3. Define the main route using PrivateRoute wrapping the App  */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute
                      loginPath="/login"
                      waitingAuth={
                        <LoadingPage logo={layoutConfig?.logo?.loading} />
                      } // Loading while waiting for auth
                    >
                      {/* 4. Wrap the App with the LocalizationProvider */}
                      <LocalizationProvider>
                        {/* 5. In AppLayout, wrap the App with the MainLayout passing the layout config */}
                        {/* 6. In AppLayout, add the react-router-dom Outlet */}
                        <AppLayout layoutConfig={layoutConfig} />
                      </LocalizationProvider>
                    </PrivateRoute>
                  }
                >
                  {/* 7. Create private routes whose components will be within App */}
                  {routeElements.map(({ path, element }, index) => (
                    <Route
                      path={path}
                      element={
                        typeof element === 'function' ? element() : element
                      }
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
                      loginMethods={loginMethods || ['google']}
                      leftImage={leftImage}
                      topImage={topImage || leftImage}
                      zapNewSessionApi={zapNewSessionApi}
                      zapLoginPhone={zapLoginPhone}
                      afterEmailLoginApi={afterEmailLoginApi}
                      onAfterLogin={onAfterLogin}
                    />
                  }
                />
                {/* 10. Create routes for each login method */}
                <Route
                  path="/login-phone"
                  element={
                    <LoginPhone
                      leftImage={leftImage}
                      topImage={topImage || leftImage}
                      afterPhoneLoginApi={afterPhoneLoginApi}
                      onAfterLogin={onAfterLogin}
                    />
                  }
                />
                <Route
                  path="/login-whatsapp"
                  element={
                    <LoginWhatsApp
                      leftImage={leftImage}
                      topImage={topImage || leftImage}
                      afterWhatsAppLoginApi={afterWhatsAppLoginApi}
                      zapLoginPhone={zapLoginPhone}
                      onAfterLogin={onAfterLogin}
                    />
                  }
                />
                {/* 11. Create open routes without layouts */}
                {openRouteElements?.map(({ path, element }, index) => (
                  <Route
                    path={path}
                    element={
                      typeof element === 'function' ? element() : element
                    }
                    key={index}
                  />
                ))}
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </NotistackProvider>
      </ThemeProvider>
    </Suspense>
  );
};

export default AppBase;
