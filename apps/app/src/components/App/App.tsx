import { Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';

import { auth } from '@postgpt/firebase';
import { signOut } from 'firebase/auth';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './App.module.scss';

export function App() {
  const logout = async () => {
    sessionStorage.clear();
    if (auth.currentUser) {
      await signOut(auth);
    }
    window.location.reload();
  };

  return (
    <div>
      <h1>Welcome to app!</h1>

      <Button onClick={logout} variant="contained" color="primary">
        Sair
      </Button>

      <Outlet />
    </div>
  );
}

export default App;
