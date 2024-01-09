import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { CirclePicker } from 'react-color';

import { useThemeConfig } from '../../theme';
import { createPaletteConfig } from '../../palette';
import {
  amber,
  belefit,
  blue,
  criaty,
  fuchsia,
  golden,
  lime,
  purple,
  red,
  slate,
  stone,
  violet,
} from '../../colors';

export const ThemeColorSelector = () => {
  const { t } = useTranslation();

  const [themeConfig, setThemeConfig] = useThemeConfig();
  const currentColor = themeConfig.paletteConfig?.light?.primary?.main;

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleThemeChange = (hexColor: string) => {
    // Replace the palette config for the current theme
    const newThemeConfig = {
      ...themeConfig,
      paletteConfig: createPaletteConfig(hexColor),
    };
    // Saves theme config
    localStorage.setItem('theme-config', JSON.stringify(newThemeConfig));
    // Change theme
    setThemeConfig(newThemeConfig);
    // Close the color picker
    handleClose();
  };

  return (
    <Stack direction="row" alignItems="center">
      <Stack
        direction="row"
        gap="12px"
        alignItems="center"
        sx={{ m: '8px', p: '6px 16px' }}
        onClick={handleClick}
      >
        <Box
          sx={{
            bgcolor: currentColor || '#fff',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
          }}
        />
        <Typography variant="body2">{t('theme:label.theme-color')}</Typography>
      </Stack>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Card>
          <CardContent>
            <CirclePicker
              color={currentColor || '#fff'}
              colors={[
                // golden,
                // amber,
                // lime,
                // criaty,
                // blue,
                // violet,
                // purple,
                // fuchsia,
                // belefit,
                // red,
                // slate,
                // stone,
                '#4B2507',
                '#B28965',
                '#9B6F41', // 1
                '#BF9770',
                '#70371F', // 2
                '#B07649',
                '#C7A182',
                '#4B1616',
                '#55522D',
                '#8E844D',
              ]}
              onChangeComplete={(color: { hex: string }) =>
                handleThemeChange(color.hex)
              }
            />
          </CardContent>
        </Card>
      </Popover>
    </Stack>
  );
};
