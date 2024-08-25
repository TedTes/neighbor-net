import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Dashboard } from "@mui/icons-material";
import { Box, CssBaseline } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { AppRoutes } from "./config";
import { AuthProvider } from "./contexts/AuthContext";
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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              p: 3,
            }}
          >
            <main>
              <AppRoutes />
            </main>
          </Box>
        </Box>
      </Router>
    </AuthProvider>
  );
};

export default App;
