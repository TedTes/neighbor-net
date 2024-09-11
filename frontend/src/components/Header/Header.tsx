import React, { useState } from "react";
import { Typography, Box, Button, Container } from "@mui/material";
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
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          className="logo"
          sx={{ position: "absolute", left: "2em", top: "1em" }}
        >
          Neighbor-Net
        </Typography>
        <Box
          sx={{
            border: "solid #388e3c 1px",
            position: "absolute",
            right: "2.8em",
            top: "1em",
          }}
        >
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
              // startIcon={<AccountCircleIcon />}
              onClick={onSignIn}
              className="signInOut"
            >
              Sign In
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
};
