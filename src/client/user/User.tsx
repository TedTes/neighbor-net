import { useState, useEffect } from "react";
import { listUsers } from "./user-api";
import { User } from "../interfaces";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import ArrowForward from "@mui/icons-material/ArrowForward";

export const UsersView = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchUsers() {
      const result = await listUsers(abortController.signal);
      setUsers(result);
    }
    fetchUsers();
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return (
    <Paper elevation={4}>
      <Typography variant="h6">All Users</Typography>
      <List dense>
        {users.map((item, i) => {
          return (
            <Link to={"/user/" + item._id} key={i}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
};
