import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

export function Events() {
  return (
    <div style={{ width: "300px", marginLeft: "16px" }}>
      <Card style={{ marginBottom: "16px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Suggested Friends
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar src="/path/to/avatar.jpg" />
              </ListItemAvatar>
              <ListItemText primary="John Doe" secondary="5 mutual friends" />
              <Button variant="contained" color="primary" size="small">
                Add
              </Button>
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: "16px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Trending Topics
          </Typography>
          <Button
            variant="outlined"
            size="small"
            style={{ marginBottom: "8px" }}
          >
            #ReactJS
          </Button>
          <Button
            variant="outlined"
            size="small"
            style={{ marginBottom: "8px" }}
          >
            #WebDevelopment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Events;

// import React from "react";

// type EventProps = {
//   id: string;
//   title: string;
//   date: string;
//   time: string;
//   location: string;
//   description?: string;
//   attendees?: string[];
//   onRSVP?: (id: string) => void;
//   onCancelRSVP?: (id: string) => void;
// };

// export const Events: React.FC<EventProps> = ({
//   id,
//   title,
//   date,
//   time,
//   location,
//   description,
//   attendees = [],
//   onRSVP,
//   onCancelRSVP,
// }) => {
//   const handleRSVP = () => {
//     if (onRSVP) {
//       onRSVP(id);
//     }
//   };

//   const handleCancelRSVP = () => {
//     if (onCancelRSVP) {
//       onCancelRSVP(id);
//     }
//   };

//   return (
//     <div className="event-card">
//       <h2>{title}</h2>
//       <p>
//         <strong>Date:</strong> {date}
//       </p>
//       <p>
//         <strong>Time:</strong> {time}
//       </p>
//       <p>
//         <strong>Location:</strong> {location}
//       </p>
//       {description && (
//         <p>
//           <strong>Description:</strong> {description}
//         </p>
//       )}
//       {attendees.length > 0 && (
//         <p>
//           <strong>Attendees:</strong> {attendees.join(", ")}
//         </p>
//       )}
//       <div className="event-actions">
//         <button onClick={handleRSVP}>RSVP</button>
//         <button onClick={handleCancelRSVP}>Cancel RSVP</button>
//       </div>
//     </div>
//   );
// };

// export default Event;
