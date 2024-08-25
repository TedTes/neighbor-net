import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  InputBase,
  Fade,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Slide,
  Fab,
  useScrollTrigger,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import MessageIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
    h4: {
      fontWeight: 600,
      color: "#ffffff",
    },
    body1: {
      color: "#B0BEC5",
    },
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
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#2C2F33",
          borderRadius: 12,
          padding: 16,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
  },
});

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const Home: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          color: "text.primary",
        }}
      >
        {/* Top Header with Scroll Effect */}
        <HideOnScroll>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                Neighbor-Net
              </Typography>
              <Box sx={{ position: "relative", mr: 2 }}>
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
                  }}
                />
              </Box>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </HideOnScroll>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {/* Navigation Sidebar */}
            <Grid item xs={2}>
              <Paper sx={{ position: "sticky", top: 80 }}>
                <List>
                  <ListItem button>
                    <HomeIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button>
                    <EventIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Events" />
                  </ListItem>
                  <ListItem button>
                    <MessageIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Messages" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Main Content Area */}
            <Grid item xs={8}>
              <Fade in timeout={1000}>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Community Feed
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    {/* Sample Cards */}
                    <Grid item xs={12} md={6}>
                      <Card sx={{ bgcolor: "background.paper" }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/cards/community-event.jpg"
                            alt="Community Event"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Community Event
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Join us for a community gathering this Saturday at
                              the central park.
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ bgcolor: "background.paper" }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/cards/maintenance.jpg"
                            alt="Maintenance Alert"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Maintenance Alert
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              The elevator will be under maintenance from 10 AM
                              to 2 PM tomorrow.
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                    {/* Additional cards can be added here */}
                  </Grid>
                </Box>
              </Fade>
            </Grid>

            {/* Right Sidebar */}
            <Grid item xs={2}>
              <Fade in timeout={1000}>
                <Paper sx={{ position: "sticky", top: 80 }}>
                  <Typography variant="h6" gutterBottom>
                    Upcoming Events
                  </Typography>
                  <List>
                    <ListItem>
                      <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                        E
                      </Avatar>
                      <ListItemText
                        primary="Event 1"
                        secondary="Tomorrow at 5pm"
                      />
                    </ListItem>
                    <ListItem>
                      <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>E</Avatar>
                      <ListItemText
                        primary="Event 2"
                        secondary="Friday at 6pm"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Container>

        {/* Floating Action Button for Posting */}
        <Fab
          color="secondary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </ThemeProvider>
  );
};
