import React, { useState } from "react";
import { ChannelList } from "./ChannelList";
import MessageWindow from "./MessageWindow";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import "./ChatWindow.styles.css";
import { CreateChannelModal } from "../Modals";
import { Container, Grid, Paper, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const ChatWindow: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("User1");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [channels, setChannels] = useState<string[]>(["general", "random"]);
  const [newChannel, setNewChannel] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleAddChannel = () => {
    if (newChannel.trim() && !channels.includes(newChannel)) {
      setChannels([...channels, newChannel]);
      setNewChannel("");
    }
    setIsModalOpen(false);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "6%",
          marginLeft: "auto",
          height: "80vh",
          position: "relative",
          maxWidth: "1000px",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            height: "10%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
            sx={{
              marginTop: "10px",
              background: "#388e3c",
              maxWidth: "100px",
              width: "84px",
              height: "30px",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "30px",
              textTransform: "capitalize",
            }}
          >
            <PersonAddIcon />
            <span>Add</span>
          </Button>
        </Grid>

        {/* Conversation List */}
        <Grid item xs={12} md={4} sx={{ height: "90%" }}>
          <Paper sx={{ height: "100%" }}>
            <ChannelList
              channels={channels}
              onSelectChannel={setSelectedChannel}
            />
          </Paper>
        </Grid>

        {/* Message Window */}
        <Grid item xs={12} md={8} sx={{ height: "90%" }}>
          <Paper sx={{ height: "100%" }}>
            {selectedChannel && (
              <MessageWindow channel={selectedChannel} username={username} />
            )}
          </Paper>
        </Grid>
      </Grid>
      {
        <CreateChannelModal
          handleAddChannel={handleAddChannel}
          handleCloseModal={handleCloseModal}
          isModalOpen={isModalOpen}
          setNewChannel={setNewChannel}
          newChannel={newChannel}
        />
      }
    </Container>
  );
};
