import { Outlet } from 'react-router-dom';
import { Container, Typography, Stack } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './App.module.scss';
import { DashboardLayout } from '@postgpt/ui-mininal-tmpl';

const MENU_OPTIONS = [
  {
    label: 'Site',
    // icon: 'eva:home-fill',
    href: '/',
  },
  // {
  //   label: "Profile",
  //   icon: "eva:person-fill",
  //   href: "#",
  // },
  // {
  //   label: "Settings",
  //   icon: "eva:settings-2-fill",
  //   href: "#",
  // },
];

export function App() {
  return (
    <DashboardLayout accountMenuOptions={MENU_OPTIONS}>
      <Container maxWidth="lg" sx={{ margin: '4rem auto' }}>
        <Stack alignItems="center" gap="4rem">
          <Typography variant="h1">Welcome to app!</Typography>

          <Outlet />
        </Stack>
      </Container>
    </DashboardLayout>
  );
}

export default App;
