import { Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';

import { auth } from '@postgpt/firebase';
import { signOut } from 'firebase/auth';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './App.module.scss';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

export function App() {
  const logout = async () => {
    sessionStorage.clear();
    if (auth.currentUser) {
      await signOut(auth);
    }
    window.location.reload();
  };

  return (
    <Container maxWidth="lg" sx={{ margin: '4rem auto' }}>
      <Stack alignItems="center" gap="4rem">
        <Typography variant="h1" color="initial">
          Welcome to app!
        </Typography>

        <Button onClick={logout} variant="contained" color="primary">
          Sair
        </Button>

        <Outlet />
      </Stack>
    </Container>
  );
}

export default App;
