import { PropsWithChildren, ReactElement, Suspense, useEffect } from 'react';
import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';
import { Container } from '@mui/material';
import './styles.scss';

import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from './Fallback';

import {
  FirebaseConfig,
  IUser,
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

import { useExtNavigate } from './useExtNavigate';

import { i18nInit } from '@blockium/i18n';
i18nInit();

type LoginMethod = 'phone' | 'whatsapp' | 'email' | 'google';

export interface AuthConfig {
  config: FirebaseConfig;
  authRoute?: string;
  loginMethods?: LoginMethod[];
  loginWithRedirect?: boolean;
  leftImage?: string;
  topImage?: string;
  zapNewSessionApi?: string;
  zapLoginPhone?: string;
  afterEmailLoginApi?: string;
  afterPhoneLoginApi?: string;
  afterWhatsAppLoginApi?: string;
  onAfterLogin?: (user: IUser, loginParams?: string) => Promise<boolean>;
  onAfterAuthStateChanged?: (user: IUser) => Promise<boolean>;
}

type AuthAppLayoutProps = {
  layoutConfig?: LayoutConfig;
};

// It's necessary to wrap the useAuthLayoutConfig hook in a component
// Because it requires the ThemeProvider context
const AuthAppLayout: React.FC<AuthAppLayoutProps> = ({ layoutConfig }) => {
  const [extNavigate] = useExtNavigate();
  const navigate = useNavigate();

  // Allow components external do route components to navigate
  useEffect(() => {
    extNavigate && navigate(extNavigate);
  }, [extNavigate, navigate]);

  const layoutConfigExtended = useAuthLayoutConfig({ layoutConfig });

  return (
    <MainLayout layoutConfig={layoutConfigExtended}>
      <Container maxWidth={false} sx={{ margin: '0 auto' }}>
        <Suspense fallback={<LoadingPage logo={layoutConfig?.logo?.loading} />}>
          {/* 6. Add the react-router-dom Outlet */}
          <Outlet />
        </Suspense>
      </Container>
    </MainLayout>
  );
};

type AppLayoutProps = PropsWithChildren & {
  layoutConfig?: LayoutConfig;
};

// It's necessary to wrap the useAuthLayoutConfig hook in a component
// Because it requires the ThemeProvider context
const AppLayout: React.FC<AppLayoutProps> = ({ layoutConfig, children }) => {
  const [extNavigate] = useExtNavigate();
  const navigate = useNavigate();

  // Allow components external do route components to navigate
  useEffect(() => {
    extNavigate && navigate(extNavigate);
  }, [extNavigate, navigate]);

  return (
    <MainLayout layoutConfig={layoutConfig}>
      <Container maxWidth={false} sx={{ margin: '0 auto' }}>
        <Suspense fallback={<LoadingPage logo={layoutConfig?.logo?.loading} />}>
          {children}
        </Suspense>
      </Container>
    </MainLayout>
  );
};

export type RouteElement = {
  path: string;
  element: ReactElement | (() => ReactElement);
};

type AppBaseProps = PropsWithChildren & {
  authConfig?: AuthConfig;
  themeConfig?: ThemeConfig;
  layoutConfig?: LayoutConfig;
  routeElements?: RouteElement[];
  openRouteElements?: RouteElement[];
};

// AppBase is the base component of the app. It is responsible for:
// 1. Initializing Firebase
// 2. Customizing the theme
// 3. Wrapping the App with a NotistackProvider
// 4. Wrapping the App with an ErrorBoundary
// 5. Wrapping the App with the LocalizationProvider
// 6. Defining the main route using PrivateRoute
// 7. Wrapping the App with the MainLayout passing the layout config
// 8. Adding the react-router-dom Outlet
// 9. Creating the sub-routes whose components will be within App
// 10. Creating the login route
// 11. In the login component, defining the login methods
// 12. Creating routes for each login method
// 13. Create open routes
//
// Functionalities:
// - Automatic Firebase Configuration (reading config from .env files)
// - Customizable Login Methods: phone, whatsapp, google and email (soon).
// - Customizable Routes
// - User Authorization Control for private routes
// - Internationalization
// - Customizable Theme
// - Theme color change, with many color options
// - Helper method to create palette config
// - Customizable Layout
// - Configurable Top Bar
// - Configurable Side Bar
// - Configurable User Popover
// - Customizable Logo
// - Customizable Loading Page
// - Light and Dark Mode
// - High Level New UI Components (Heros, Dialogs, Forms, Tables, Charts, Chat, Carousel, etc.)
// - Low Level New UI Components (Buttons, Inputs, etc.)
// - Simplified Rich Forms
// - Easy Notification (Alert) Messages
//
export const AppBase: React.FC<AppBaseProps> = ({
  authConfig,
  themeConfig,
  layoutConfig,
  routeElements,
  openRouteElements,
  children,
}) => {
  // 1. Initialize Firebase if authConfig is provided
  authConfig && initFirebase(authConfig.config);

  const {
    authRoute,
    loginMethods,
    loginWithRedirect,
    leftImage,
    topImage,
    zapNewSessionApi,
    zapLoginPhone,
    afterEmailLoginApi,
    afterPhoneLoginApi,
    afterWhatsAppLoginApi,
    onAfterLogin,
    onAfterAuthStateChanged,
  } = authConfig || {};

  return (
    // 2. Customize theme
    <ThemeProvider config={themeConfig}>
      {/* // 3. Wrap the App with a NotistackProvider */}
      <NotistackProvider>
        {/* // 4. Wrap the App with an ErrorBoundary */}
        <ErrorBoundary fallbackRender={Fallback}>
          {/* 5. Wrap the App with the LocalizationProvider */}
          <LocalizationProvider>
            <RouterProvider
              router={createBrowserRouter(
                createRoutesFromElements(
                  <>
                    {/* 6. Define the auth route using PrivateRoute */}
                    {routeElements && (
                      <Route
                        path={authRoute || '/'}
                        element={
                          <PrivateRoute
                            loginPath="/login"
                            waitingAuth={
                              // Loading while waiting for auth
                              <LoadingPage logo={layoutConfig?.logo?.loading} />
                            }
                            onAfterAuthStateChanged={onAfterAuthStateChanged}
                          >
                            {/* 7. In AuthAppLayout, wrap the App with the MainLayout passing the layout config */}
                            {/* 8. In AuthAppLayout, add the react-router-dom Outlet */}
                            <AuthAppLayout layoutConfig={layoutConfig} />
                          </PrivateRoute>
                        }
                      >
                        {/* 9. Create private routes whose components will be within App */}
                        {routeElements.map(({ path, element }, index) => (
                          <Route
                            path={path}
                            element={
                              typeof element === 'function'
                                ? element()
                                : element
                            }
                            key={index}
                          />
                        ))}
                      </Route>
                    )}
                    {/* 10. Create the login route */}
                    <Route path="/login">
                      <Route
                        path=""
                        element={
                          // 11. In the login component, define the login methods
                          <Login
                            loginMethods={loginMethods || ['google']}
                            loginWithRedirect={loginWithRedirect}
                            leftImage={leftImage}
                            topImage={topImage || leftImage}
                            zapNewSessionApi={zapNewSessionApi}
                            zapLoginPhone={zapLoginPhone}
                            afterEmailLoginApi={afterEmailLoginApi}
                            onAfterLogin={onAfterLogin}
                          />
                        }
                      />
                      <Route
                        path="/login/:loginParams"
                        element={
                          // 11. In the login component, define the login methods
                          <Login
                            loginMethods={loginMethods || ['google']}
                            loginWithRedirect={loginWithRedirect}
                            leftImage={leftImage}
                            topImage={topImage || leftImage}
                            zapNewSessionApi={zapNewSessionApi}
                            zapLoginPhone={zapLoginPhone}
                            afterEmailLoginApi={afterEmailLoginApi}
                            onAfterLogin={onAfterLogin}
                          />
                        }
                      />
                    </Route>
                    {/* 12. Create routes for each login method */}
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
                    {/* 13. Create open routes */}
                    {openRouteElements?.map(({ path, element }, index) => (
                      <Route
                        path={path}
                        element={
                          <AppLayout layoutConfig={layoutConfig}>
                            {typeof element === 'function'
                              ? element()
                              : element}
                          </AppLayout>
                        }
                        key={index}
                      />
                    ))}
                  </>,
                ),
              )}
            />
            {children}
          </LocalizationProvider>
        </ErrorBoundary>
      </NotistackProvider>
    </ThemeProvider>
  );
};

export default AppBase;
