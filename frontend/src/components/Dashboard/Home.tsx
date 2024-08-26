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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import data from "../../../../large_posts.json";
import { List, ListItem, ListItemText } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const theme = createTheme({
  palette: {
    // primary: {
    //   main: "#1976d2",
    // },
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

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<postsType[] | undefined>();

  useEffect(() => {
    setPosts(data);
  });
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <List>
          {posts?.map((post) => (
            <ListItem>
              <Card sx={{ maxWidth: 600, margin: "0 auto", mb: 3 }}>
                <CardHeader
                  avatar={<Avatar src={post.user.avatar} />}
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post.user.name}
                  subheader={post.datePosted}
                />
                <CardMedia
                  component="img"
                  height="300"
                  image={post.image}
                  alt="Post image"
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="add to favorites"
                    // onClick={handleLike}
                    // color={liked ? "error" : "default"}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    {post.likes}
                  </Typography>
                  <IconButton aria-label="comment">
                    <CommentIcon />
                  </IconButton>
                  {/* <Typography variant="body2" color="text.secondary">
                    {comments}
                  </Typography> */}
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
              ;
            </ListItem>
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
};
