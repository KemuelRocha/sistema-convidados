import type { FunctionComponent } from 'react';
import type { PageIntroProps } from './PageIntro.interface';
import { Box, Breadcrumbs, Typography } from '@mui/material';

export const PageIntro: FunctionComponent<PageIntroProps> = ({
  title,
  links,
  description,
}) => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        {links.map((link) => (
          <Typography
            key={link.name}
            color="text.primary"
            component="a"
            href={link.href}
            sx={{
              textDecoration: 'none',
              color: '#fff',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {link.name}
          </Typography>
        ))}
      </Breadcrumbs>
      <Typography variant="h4" component="h1" gutterBottom textAlign={'left'}>
        {title}
      </Typography>
      <Typography variant="body1" gutterBottom textAlign={'left'}>
        {description}
      </Typography>
    </>
  )
};
