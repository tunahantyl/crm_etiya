import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector } from '../../app/hooks';

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - 240px)`,
        ml: '240px',
        bgcolor: 'white',
        color: 'text.primary',
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CRM System
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {user?.name}
          </Typography>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;