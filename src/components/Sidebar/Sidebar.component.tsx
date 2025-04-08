import type { FunctionComponent } from 'react';
import type { SidebarProps } from './Sidebar.interface';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export const Sidebar: FunctionComponent<SidebarProps> = () => {
  const navigate = useNavigate();
  const onClick = (text: string) => {
    switch (text) {
      case 'Dashboard':
        navigate('/dashboard');
        break;
      case 'Cadastro':
        navigate('/cadastro');
        break;
      case 'Atualizacao':
        navigate('/atualizacao');
        break;
      case 'Apresentacao':
        navigate('/apresentacao');
        break;
      case 'Estatisticas':
        navigate('/estatisticas');
        break;
      default:
        break;
    }
  }

  return (
    <Drawer variant="permanent"
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
          borderRight: '1px solid #333',
        },
      }}
      anchor="left"
    >
      <Box
        role="presentation"
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        sx={{
          padding: '16px',
        }}
      >
        <Box
          component="img"
          src="src/assets/logo.png"
          alt="Logo"
          sx={{
            width: '100%',
            height: 'auto',
            marginBottom: '16px',
          }}
        />
        <List>
          {['Dashboard', 'Cadastro', 'Atualizacao', 'Apresentacao', 'Estatisticas'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => onClick(text)}>
                <ListItemIcon sx={{ color: '#fff' }}>
                  {index === 0 && <DashboardIcon />}
                  {index === 1 && <GroupAddIcon />}
                  {index === 2 && <ManageAccountsIcon />}
                  {index === 3 && <PeopleOutlineIcon />}
                  {index === 4 && <AutoGraphIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: '#333' }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#fff' }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configurações" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
};