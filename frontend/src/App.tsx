import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Home as NewsFeed } from "./components/Dashboard";
import { useAuth } from "./hooks";
import { AppRoutes } from "./config";
import Grid from "@mui/material/Grid";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    // background: {
    //   default: "#f4f4f4",
    //   paper: "#ffffff",
    // },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      color: "#1976d2",
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 3,
      },
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
        <Grid container sx={{ marginTop: 0 }}>
          <Grid
            item
            lg={12}
            sx={{
              width: "100vw",
              position: "sticky",
              zIndex: 100000,
              top: ".5em",
              background: "#e8e8e8",
              marginTop: 0,
            }}
          >
            <Header
              isAuthenticated={isAuthenticated}
              onSignIn={() => {}}
              onSignOut={() => {}}
            />
          </Grid>
          <Grid
            item
            lg={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              // border: 2,
              // borderColor: "green",
              height: "100vh",
            }}
          >
            <Sidebar />
          </Grid>
          <Grid item lg={6} sx={{}}>
            <AppRoutes />
          </Grid>
          <Grid item lg={3} sx={{}}>
            <div>right side</div>
          </Grid>
        </Grid>
      </Router>
    </ThemeProvider>
  );
};

export default App;
