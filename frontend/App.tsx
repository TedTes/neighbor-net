import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { CssBaseline, Button } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      color: "#dc004e",
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 3, // Set default elevation for Card
      },
      styleOverrides: {
        root: {
          borderRadius: "12px", // Override the default border radius
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Custom shadow
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <p>in progress</p>
      </Router>
    </ThemeProvider>
  );
}

export default App;
