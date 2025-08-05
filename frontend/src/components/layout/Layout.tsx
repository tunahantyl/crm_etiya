import { Box } from '@mui/material';
import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DRAWER_WIDTH = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} width={DRAWER_WIDTH} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          marginLeft: isSidebarOpen ? `${DRAWER_WIDTH}px` : 0,
          marginTop: '64px',
          transition: 'margin 0.2s',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;