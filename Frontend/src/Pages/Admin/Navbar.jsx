import React, { useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  NotificationsOutlined,
  SearchOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { useAuthAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleForm, closeDialog, loginRole }) => {
  const { currentAdmin, logoutAdmin } = useAuthAdmin();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle avatar click and open the menu
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle menu item click
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutAdmin(); // Call the logout function from the context
    navigate('/'); // Redirect to the root path after logging out
    setAnchorEl(null);
  };

  return (
    <Box className="flex items-center justify-between py-4 w-full">
      <Box className="flex items-center gap-2 w-full">
        {/* Search bar for larger screens */}
        <Box className="hidden md:flex items-center h-12 bg-gray-200 rounded-lg w-full">
          <InputBase placeholder="Search" className="ml-2 flex-1" />
          <IconButton type="button" className="p-1">
            <SearchOutlined />
          </IconButton>
        </Box>
      </Box>

      <Box className="flex items-center gap-2">
        {/* Notifications */}
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        {/* Settings */}
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        {/* Profile Avatar with Dropdown */}
        <IconButton onClick={handleAvatarClick}>
          {currentAdmin && currentAdmin.A_Name ? (
            <Avatar sx={{ bgcolor: 'green', marginRight: '4px' }}>
              {currentAdmin.A_Name[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar sx={{ bgcolor: 'grey.400' }}>A</Avatar> // Fallback
          )}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
