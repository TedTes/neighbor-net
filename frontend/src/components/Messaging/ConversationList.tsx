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
  onSelectRoom: (room: string) => void;
}

const ConversationList: React.FC<ChatListProps> = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState<string[]>(["general", "random"]);
  const [newRoom, setNewRoom] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleAddRoom = () => {
    if (newRoom.trim() && !rooms.includes(newRoom)) {
      setRooms([...rooms, newRoom]);
      setNewRoom("");
    }
    //setIsModalOpen(false);
  };
  const handleSearch = () => {
    // Implement search logic here if needed
    alert(`Searching for: ${searchQuery}`);
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {"test"}
      </Typography>
      <Divider />
      <List sx={{ marginTop: "1em" }}>
        {rooms.map((room, index) => (
          <ListItem key={index} onClick={() => onSelectRoom(room)}>
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
              <ListItemText primary={room} />
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ConversationList;
