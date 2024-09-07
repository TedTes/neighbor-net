import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
} from "@mui/material";

interface ChatListProps {
  onSelectRoom: (room: string) => void;
}

const ConversationList: React.FC<ChatListProps> = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState<string[]>(["general", "random"]);
  const [newRoom, setNewRoom] = useState<string>("");

  const handleAddRoom = () => {
    if (newRoom.trim() && !rooms.includes(newRoom)) {
      setRooms([...rooms, newRoom]);
      setNewRoom("");
    }
  };

  return (
    <Box>
      <List>
        {rooms.map((room, index) => (
          <ListItem button key={index} onClick={() => onSelectRoom(room)}>
            <ListItemText primary={room} />
          </ListItem>
        ))}
      </List>
      <TextField
        variant="outlined"
        placeholder="Add new chat"
        fullWidth
        value={newRoom}
        onChange={(e) => setNewRoom(e.target.value)}
        sx={{ marginTop: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddRoom}
        sx={{ marginTop: "10px" }}
      >
        Add Chat
      </Button>
    </Box>
  );
};

export default ConversationList;
