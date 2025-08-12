import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === 'ADMIN';

  const menuItems = [
    {
      text: 'Gösterge Paneli',
      icon: <DashboardIcon />,
      path: '/dashboard',
      showAlways: true,
    },
    {
      text: 'Müşteriler',
      icon: <PeopleIcon />,
      path: '/customers',
      adminOnly: true,
    },
    {
      text: 'Görevler',
      icon: <AssignmentIcon />,
      path: '/tasks',
      showAlways: true,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#1a237e', // Koyu mavi
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <Typography variant="h6" component="div" sx={{ color: 'white' }}>
          CRM System
        </Typography>
      </Box>
      
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => {
          if (!item.showAlways && item.adminOnly && !isAdmin) {
            return null;
          }

          return (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(255,255,255,0.08)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.12)',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.04)',
                },
                my: 0.5,
                mx: 1,
                borderRadius: 1,
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;