import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import "./Marketplace.styles.css";
export const Marketplace: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <Box className="marketplace">
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="Marketplace Tabs"
        sx={{ marginTop: 2, textColor: "black", position: "fixed" }}
      >
        <Tab label="All" />
        <Tab label="Free Items" />
        <Tab label="Buy Items" />
      </Tabs>
      <Box sx={{ padding: 2, marginTop: 8 }}>
        {tabIndex === 0 && (
          <Card>
            <CardContent>
              <Typography variant="h5">Free Items</Typography>
              <Typography variant="body2" color="text.secondary">
                Discover items available for free in your community.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 16 }}
              >
                View Free Items
              </Button>
            </CardContent>
          </Card>
        )}
        {tabIndex === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h5">Buy Items</Typography>
              <Typography variant="body2" color="text.secondary">
                Find items available for purchase in your community.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 16 }}
              >
                Browse Items to Buy
              </Button>
            </CardContent>
          </Card>
        )}
        {tabIndex === 2 && (
          <Card>
            <CardContent>
              <Typography variant="h5">Sell Items</Typography>
              <Typography variant="body2" color="text.secondary">
                List your items for sale and reach out to potential buyers.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 16 }}
              >
                Start Selling
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};
