import React, { useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import ConversationList from "./ConversationList";
import MessageWindow from "./MessageWindow";
import "./ChatWindow.styles.css";
export const ChatWindow: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("User1");

  return (
    <Container>
      <Grid container spacing={2} className="chat-window">
        <Grid item xs={4}>
          <Paper className="conversation-list">
            <Typography variant="h6" gutterBottom>
              Chats
            </Typography>
            <ConversationList onSelectRoom={setSelectedRoom} />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className="message-window">
            {selectedRoom ? (
              <MessageWindow room={selectedRoom} username={username} />
            ) : (
              <Typography variant="h6">
                Select a chat to start messaging
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
