import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import io from "socket.io-client";

const socket = io("http://localhost:3000");

interface ChatWindowProps {
  room: string;
  username: string;
}

interface Message {
  user: string;
  text: string;
  timestamp: string;
}

const MessageWindow: React.FC<ChatWindowProps> = ({ room, username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    socket.emit("join_room", { room, username });

    socket.on("room_data", (messages: Message[]) => {
      setMessages(messages);
    });

    socket.on("new_message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("room_data");
      socket.off("new_message");
    };
  }, [room, username]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      socket.emit("send_message", { room, message: messageInput, username });
      setMessageInput("");
    }
  };

  return (
    <Box
      sx={{
        // border: 2,
        // borderColor: "black",
        height: "100%",
        position: "relative",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {room}
      </Typography>
      <Divider />
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${msg.user}: ${msg.text}`}
              secondary={new Date(msg.timestamp).toLocaleTimeString()}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        sx={{ bottom: ".2em", position: "absolute" }}
        fullWidth
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSendMessage();
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                aria-label="search"
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
export default MessageWindow;
