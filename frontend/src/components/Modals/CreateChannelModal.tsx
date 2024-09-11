import {
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
type channelModalTypes = {
  handleAddChannel: () => void;
  handleCloseModal: () => void;
  isModalOpen: boolean;
  setNewChannel: (channel: string) => void;
  newChannel: string;
};
export const CreateChannelModal: React.FC<channelModalTypes> = ({
  handleAddChannel,
  handleCloseModal,
  isModalOpen,
  setNewChannel,
  newChannel,
}) => {
  return (
    <Dialog
      open={isModalOpen}
      onClose={handleCloseModal}
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
      <DialogTitle>Create Channel</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Add one or more people"
            fullWidth
            value={newChannel}
            onChange={(e) => setNewChannel(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddChannel} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
