import type { FunctionComponent } from 'react';
import type { HeaderProps } from './Header.interface';
import { Box, Stack } from '@mui/material';
import { PageIntro } from '../PageIntro';

export const Header: FunctionComponent<HeaderProps> = ({ title, links }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="top"
      sx={{
        padding: '16px',
        backgroundColor: 'transparent',
        color: '#ffffff',
        // borderBottom: '1px solid #333',
        // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        top: 0,
        left: 250,
        right: 0,
        zIndex: 1000,
        width: '100%',
      }}
    >
      <PageIntro
        title={title}
        links={links}
      />
      <Box
        component="span"
        sx={{
          fontSize: '16px',
          color: '#ffffff',
          pt: 2,
        }}
      >
        User Name
      </Box>
    </Stack>
  )
};
