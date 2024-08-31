import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArticleIcon from "@mui/icons-material/Article";
import CreateIcon from "@mui/icons-material/Create";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Input,
} from "@mui/material";
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
        <InputBase placeholder="Search…" />

        <Button
          color="inherit"
          startIcon={<NoteAltIcon />}
          onClick={showPostModal}
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
