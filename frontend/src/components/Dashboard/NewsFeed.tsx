import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  Fade,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Fab,
  CardHeader,
  CardActions,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import data from "../../../../large_posts.json";
import { List, ListItem, ListItemText } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Newsfeed.styles.css";
import { Events } from "../Events";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      // default: "#1E201E",
      // paper: "#2C2F33",
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
    MuiPaper: {
      styleOverrides: {
        root: {
          // backgroundColor: "#2C2F33",
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
interface User {
  name: string;
  avatar: string;
}

interface Comment {
  user: string;
  comment: string;
}
interface postsType {
  id: number;
  user: User;
  title: string;
  description: string;
  image: string;
  likes: number;
  comments: Comment[];
  datePosted: string;
}

export const NewsFeed: React.FC = () => {
  const [posts, setPosts] = useState<postsType[] | undefined>();

  useEffect(() => {
    setPosts(data);
  });
  return (
    <ThemeProvider theme={theme}>
      <List className="news-feed">
        <Box
          sx={{
            width: "96%",
            height: "30px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              gap: 6,
              height: "26px",
            }}
          >
            <Button
              color="inherit"
              onClick={() => alert("hello")}
              sx={{
                backgroundColor: "#e0e0e0",
                color: "black",
                width: "80px",
                height: "25px",
                borderRadius: "40px",
                display: "flex",
                justifyContent: "center",
                textTransform: "capitalize",
                "& .MuiButton-startIcon": {
                  margin: 0,
                },
                "&:hover": {
                  //  backgroundColor: "#388e3c",
                  backgroundColor: "#e0e0e0",
                  // transform: "scale(1.05)",
                  // transition: "background-color 0.3s, transform 0.3s",
                },
              }}
            >
              near by
            </Button>
            <Button
              color="inherit"
              onClick={() => alert("hello")}
              sx={{
                backgroundColor: "#e0e0e0",
                color: "black",
                width: "80px",
                height: "25px",
                borderRadius: "40px",
                display: "flex",
                justifyContent: "center",
                textTransform: "capitalize",
                "& .MuiButton-startIcon": {
                  margin: 0,
                },
                "&:hover": {
                  // backgroundColor: "#388e3c",
                  backgroundColor: "#e0e0e0",
                  // transform: "scale(1.05)",
                  // transition: "background-color 0.3s, transform 0.3s",
                },
              }}
            >
              trending
            </Button>
          </Box>
          <Button
            color="inherit"
            startIcon={<AddIcon sx={{}} />}
            onClick={() => alert("hello")}
            sx={{
              backgroundColor: "#388e3c",
              width: "100px",
              borderRadius: "40px",
              color: "#fafafa",
              display: "flex",
              justifyContent: "center",

              textTransform: "capitalize",
              "& .MuiButton-startIcon": {
                margin: 0,
              },
              "&:hover": {
                backgroundColor: "#388e3c",
                transform: "scale(1.05)",
                transition: "background-color 0.3s, transform 0.3s",
              },
            }}
          >
            <span>Post</span>
          </Button>
        </Box>
        {posts?.map((post, index) => {
          return (
            <ListItem>
              <Card key={index} className="news-feed-card" sx={{ padding: 1 }}>
                <CardHeader
                  sx={{ padding: 0.5, color: "black" }}
                  avatar={<Avatar src={post.user.avatar} />}
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post.user.name}
                  subheader={post.datePosted}
                  className="card-header"
                />
                <CardMedia
                  component="img"
                  className="card-media"
                  image={post.image}
                  alt="Post image"
                />
                <CardContent
                  sx={{
                    lineHeight: "1",
                    color: "black",
                    padding: 0,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ lineHeight: 1, fontSize: "1rem", fontWeight: 300 }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.2,
                      fontSize: ".9rem",
                      color: "black",
                      opacity: 0.8,
                      marginTop: 0.3,
                    }}
                  >
                    {post.description}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  className="card-actions"
                  sx={{ padding: 0 }}
                >
                  <IconButton
                    aria-label="add to favorites"
                    // onClick={handleLike}
                    // color={liked ? "error" : "default"}
                    className="icon"
                    sx={{ padding: 0 }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ paddingRight: 0.5 }}
                  >
                    {post.likes}
                  </Typography>
                  <IconButton aria-label="comment" sx={{ padding: 0.4 }}>
                    <CommentIcon />
                  </IconButton>
                  {/* <Typography variant="body2" color="text.secondary">
                    {comments}
                  </Typography> */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ paddingRight: 0.5 }}
                  >
                    {post.likes}
                  </Typography>
                  <IconButton aria-label="share" sx={{ padding: 0.5 }}>
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </ListItem>
          );
        })}
      </List>
      <div className="right-side">
        <Events />
      </div>
    </ThemeProvider>
  );
};
