import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";

interface ChatListProps {
  onSelectChannel: (channel: string) => void;
  channels: string[];
}

export const ChannelList: React.FC<ChatListProps> = ({
  channels,
  onSelectChannel,
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {"test"}
      </Typography>
      <Divider />
      <List sx={{ marginTop: "1em" }}>
        {channels.map((channel, index) => (
          <ListItem key={index} onClick={() => onSelectChannel(channel)}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
                alignItems: "center",
                padding: "0 .2em",
                width: "120px",
              }}
            >
              <Avatar />
              <ListItemText primary={channel} />
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
