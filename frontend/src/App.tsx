import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { useAuth } from "./hooks";
import { AppRoutes } from "./config";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { TextField, InputAdornment } from "@mui/material";
import "./App.styles.css";
const theme = createTheme({
  typography: {
    allVariants: {
      textTransform: "capitalize",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});
const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header
          isAuthenticated={isAuthenticated}
          onSignIn={() => {}}
          onSignOut={() => {}}
        />
        <TextField
          variant="outlined"
          placeholder="Search…"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ paddingLeft: ".5em" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            position: "fixed",
            zIndex: 100,
            left: "18%",
            top: "1.5em",
            maxWidth: "55%",
            width: "100%",
            height: "40px",

            "& .MuiOutlinedInput-root": {
              height: "40px",
              "& fieldset": {
                borderRadius: "20px",
                borderColor: "#388e3c",
              },
              "&:hover fieldset": {
                borderColor: "#388e3c",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#388e3c",
              },
            },
          }}
        />
        <Sidebar />
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
