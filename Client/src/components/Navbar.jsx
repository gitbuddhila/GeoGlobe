import { useNavigate } from 'react-router-dom';
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map"; // ✅ New icon for Regions
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const ModernNavbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Countries', icon: <PublicIcon />, path: '/all' },
    { text: 'Regions', icon: <MapIcon />, path: '/region' }, // ✅ Updated icon
    { text: 'Favourite', icon: <FavoriteIcon />, path: '/Favorites' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
  ];

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div">
          GeoGlobe
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              onClick={() => navigate('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <PublicIcon sx={{ mr: 1 }} /> GeoGlobe
            </Typography>
          </Box>

          {/* Navigation - hidden on mobile */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                startIcon={item.icon}
                sx={{ textTransform: 'none' }}
                onClick={() => navigate(item.path)}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Action icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <IconButton color="inherit" sx={{ display: { xs: 'flex', sm: 'none' } }}>
    <DarkModeIcon />
  </IconButton>
  
  {/* Clerk Auth Buttons */}
  <SignedIn>
    <UserButton afterSignOutUrl="/" />
  </SignedIn>
  <SignedOut>
    <SignInButton mode="modal">
      <Button variant="outlined" color="inherit" size="small">
        Sign In
      </Button>
    </SignInButton>
  </SignedOut>
</Box>
        </Toolbar>
      </AppBar>

      {/* Drawer/Sidebar */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList()}
      </Drawer>
    </Box>
  );
};

export default ModernNavbar;
