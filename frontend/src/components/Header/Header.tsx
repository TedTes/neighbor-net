import React from "react";
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
import "./header.styles.css";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#1E201E",
      paper: "#2C2F33",
    },
    text: {
      primary: "#ffffff",
      secondary: "#B0BEC5",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2C2F33",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

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
  return (
    <ThemeProvider theme={theme}>
      <div className="header-container">
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            <img
              src="/static/images/logo.png"
              alt="Neighbor-Net"
              style={{ height: 40, verticalAlign: "middle" }}
            />
          </Typography>

          {/* Search Bar */}
          <Box sx={{ position: "relative", mr: 2, flexGrow: 1, maxWidth: 400 }}>
            <SearchIcon
              sx={{
                position: "absolute",
                top: "50%",
                left: 8,
                transform: "translateY(-50%)",
                color: "#aaa",
              }}
            />
            <InputBase
              placeholder="Search…"
              sx={{
                color: "text.primary",
                pl: 5,
                pr: 1,
                borderRadius: 1,
                bgcolor: "background.paper",
                width: "100%",
              }}
            />
          </Box>

          {/* Sign In/Sign Out Button */}
          <Box>
            {isAuthenticated ? (
              <Button
                color="inherit"
                startIcon={<AccountCircleIcon />}
                onClick={onSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                color="inherit"
                startIcon={<AccountCircleIcon />}
                onClick={onSignIn}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </div>
    </ThemeProvider>
  );
};
