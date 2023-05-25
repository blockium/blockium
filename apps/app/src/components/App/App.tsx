import { Outlet } from 'react-router-dom';
import { Container, Stack } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './App.module.scss';

import { DashboardLayout } from '@postgpt/ui-mininal-tmpl';
import { LocalizationProvider } from '@postgpt/i18n-mui';

import { useLayoutConfig } from './useLayoutConfig';

export function App() {
  const layoutConfig = useLayoutConfig();

  return (
    <LocalizationProvider>
      <DashboardLayout layoutConfig={layoutConfig}>
        <Container maxWidth="lg" sx={{ margin: '0 auto' }}>
          <Stack alignItems="center" gap="4rem">
            {/* <Typography variant="h1">Welcome to app!</Typography> */}
            {/* <Link href="/" variant="h2">
            Go to home
          </Link>
          <Link href="posts/weekly/list" variant="h2">
            Go to posts
          </Link> */}
          </Stack>
          <Outlet />
        </Container>
      </DashboardLayout>
    </LocalizationProvider>
  );
}

export default App;
