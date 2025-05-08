//

import Card from './Card';
import Paper from './Paper';
import Input from './Input';
import Button from './Button';
import Tooltip from './Tooltip';
// import Backdrop from './Backdrop';
import Typography from './Typography';
import CssBaseline from './CssBaseline';
// import ScopedCssBaseline from './ScopedCssBaseline';
import Autocomplete from './Autocomplete';
import MobileStepper from './MobileStepper';
import LocalizationProvider from './LocalizationProvider';
import { Theme } from '@mui/material/styles/createTheme';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Card(theme),
    Input(theme),
    Paper(theme),
    Button(theme),
    Tooltip(theme),
    // Backdrop(theme),
    Typography(theme),
    CssBaseline(theme),
    // ScopedCssBaseline(theme),
    Autocomplete(theme),
    MobileStepper(theme),
    LocalizationProvider(theme),
  );
}
