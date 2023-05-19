import { Outlet } from 'react-router-dom';
import { Button, Container, Typography, Stack } from '@mui/material';

import { useSignOut } from '@postgpt/firebase';
import { DarkModeSwitch } from '@postgpt/theme';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './App.module.scss';

export function App() {
  const signOut = useSignOut();

  const logout = async () => {
    sessionStorage.clear();
    await signOut();
    window.location.reload();
  };

  return (
    <Container maxWidth="lg" sx={{ margin: '4rem auto' }}>
      <Stack alignItems="center" gap="4rem">
        <Typography variant="h1">Welcome to app!</Typography>

        <Button onClick={logout} variant="contained" color="primary">
          Sair
        </Button>

        <DarkModeSwitch />

        <Outlet />
      </Stack>
    </Container>
  );
}

export default App;
