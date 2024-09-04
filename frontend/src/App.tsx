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
import "./App.styles.css";
const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Container disableGutters>
        <Header
          isAuthenticated={isAuthenticated}
          onSignIn={() => {}}
          onSignOut={() => {}}
        />
        <div className="main-container">
          <Sidebar />
          <AppRoutes />
        </div>
      </Container>
    </Router>
  );
};

export default App;
