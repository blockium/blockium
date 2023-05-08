import { Outlet } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './App.module.scss';

export function App() {
  return (
    <div>
      <h1>Welcome to app!</h1>

      <Outlet />
    </div>
  );
}

export default App;
