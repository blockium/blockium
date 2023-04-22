import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// import { Hero } from '@postgpt/commonui';
// import { app } from '@postgpt/firebase';
import { useIntlMessage } from '@postgpt/i18n';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

export function App() {
  const msg = useIntlMessage();

  return (
    <>
      <Typography variant="h1" color="initial">
        {msg('site.headline')}
      </Typography>
      <Box>{msg('site.hero.for-lawers')}</Box>
      <Button variant="text" color="primary">
        {msg('site.button.try-it')}
      </Button>
    </>
  );
}

export default App;
