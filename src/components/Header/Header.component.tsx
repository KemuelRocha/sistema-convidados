import type { FunctionComponent } from 'react';
import type { HeaderProps } from './Header.interface';
import { Box, Stack } from '@mui/material';

export const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <Stack
      direction="row"
      justifyContent="right"
      alignItems="center"
      sx={{
        padding: '16px',
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
        borderBottom: '1px solid #333',
        height: '64px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        left: 250,
        right: 0,
        zIndex: 1000,
      }}
    >

      <Box
        component="span"
        sx={{
          fontSize: '16px',
          color: '#ffffff',
        }}
      >
        User Name
      </Box>
    </Stack>
  )
};
