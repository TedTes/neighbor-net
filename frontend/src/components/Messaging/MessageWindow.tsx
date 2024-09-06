import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { MessageType } from "../../interfaces";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const socket = io("http://localhost:3000");

export function MessageWindow() {
  const [channelName, setChannelName] = useState("");
  const [currentChannel, setCurrentChannel] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const createChannel = () => {
    if (channelName) {
      socket.emit("create_channel", channelName);
      joinChannel(channelName);
    }
  };

  const joinChannel = (name: string) => {
    setCurrentChannel(name);
    socket.emit("join_channel", name);
  };

  const sendMessage = () => {
    if (message && currentChannel) {
      socket.emit("send_message", { channelName: currentChannel, message });
      setMessage("");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        WebSocket Chat
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <TextField
          fullWidth
          label="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          onClick={createChannel}
          sx={{ marginRight: 1 }}
        >
          Create Channel
        </Button>
        <Button variant="outlined" onClick={() => joinChannel(channelName)}>
          Join Channel
        </Button>
      </Paper>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          fullWidth
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
        />
        <Button variant="contained" onClick={sendMessage} sx={{ marginTop: 1 }}>
          Send Message
        </Button>
      </Box>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`[${msg.channelName}] ${msg.sender}: ${msg.message}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
