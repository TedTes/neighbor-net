import React, { useState } from "react";
import ConversationList from "./ConversationList";
import MessageWindow from "./MessageWindow";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import "./ChatWindow.styles.css";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const ChatWindow: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("User1");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rooms, setRooms] = useState<string[]>(["general", "random"]);
  const [newRoom, setNewRoom] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleAddRoom = () => {
    if (newRoom.trim() && !rooms.includes(newRoom)) {
      setRooms([...rooms, newRoom]);
      setNewRoom("");
    }
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
  };

  return (
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
            background: "black",
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
          <ConversationList onSelectRoom={setSelectedRoom} />
        </Paper>
      </Grid>

      {/* Message Window */}
      <Grid item xs={12} md={8} sx={{ height: "90%" }}>
        <Paper sx={{ height: "100%" }}>
          {selectedRoom && (
            <MessageWindow room={selectedRoom} username={username} />
          )}
        </Paper>
      </Grid>

      {/* Add chat Dialog */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fullWidth
        PaperProps={{
          sx: {
            width: "400px",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            height: "650px",
            marginTop: "80px",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle>Create Chat</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Add one or more people"
              fullWidth
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddRoom} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
