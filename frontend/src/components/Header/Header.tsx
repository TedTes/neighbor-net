import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { TextField, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./Header.styles.css";

interface HeaderProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
  onSignIn: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  onSignOut,
  onSignIn,
}) => {
  const [open, setOpen] = useState(false);
  const showPostModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleImageChange = () => {};
  return (
    <div className="header-container">
      {/* Logo */}
      <Typography variant="h6" className="logo">
        Neighbour-Net
      </Typography>

      {/* Search Bar */}
      <div className="search-post">
        {/* <InputBase placeholder="Search…" className="search" /> */}
        <TextField
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
        <Button
          color="inherit"
          startIcon={<AddIcon />}
          onClick={showPostModal}
          sx={{ background: "red" }}
        >
          post
        </Button>
      </div>

      {/* Sign In/Sign Out Button */}
      <Box>
        {isAuthenticated ? (
          <Button
            color="inherit"
            startIcon={<AccountCircleIcon />}
            onClick={onSignOut}
            className="signInOut"
          >
            Sign Out
          </Button>
        ) : (
          <Button
            color="inherit"
            startIcon={<AccountCircleIcon />}
            onClick={onSignIn}
            className="signInOut"
          >
            Sign In
          </Button>
        )}
      </Box>
    </div>
  );
};
