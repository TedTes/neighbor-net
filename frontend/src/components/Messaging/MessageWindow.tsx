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
} from "@mui/material";
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
    <Box>
      <Typography variant="h6" gutterBottom>
        Room: {room}
      </Typography>
      <Divider />
      <List sx={{ height: "300px", overflowY: "auto", marginBottom: "10px" }}>
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
        variant="outlined"
        placeholder="Type a message..."
        fullWidth
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        sx={{ marginBottom: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Box>
  );
};
export default MessageWindow;
