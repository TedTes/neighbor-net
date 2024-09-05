import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  Button,
  ButtonGroup,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import ViewListIcon from "@mui/icons-material/ViewList";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "./Marketplace.styles.css";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";

import { List, ShoppingCart, LocalOffer } from "@mui/icons-material";
import { fetchFreeItems, fetchItemsToBuy } from "../../services";
export const Marketplace: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const [list, setList] = useState<object[]>([]);
  const handleChange = async (tab: string) => {
    let tempList: object[] = [];
    try {
      switch (tab) {
        case "free":
          tempList = await fetchFreeItems(tab);
          break;
        case "buy":
          tempList = await fetchItemsToBuy(tab);
          break;
      }
      setList(tempList);
    } catch (error) {
      console.log(error);
      setList(tempList);
    }

    setSelectedTab(tab);
  };

  return (
    <Box sx={{ position: "relative" }} className="marketplace">
      <div className="tabs">
        <Button
          onClick={() => handleChange("buy")}
          sx={{
            color: selectedTab === "buy" ? "white" : "black",
            backgroundColor: selectedTab === "buy" ? "black" : "#d0d0d0",
            flex: 1,
            minWidth: 90,
            minHeight: 30,
            textTransform: "capitalize",
            padding: 0,
            borderRadius: 5,
            marginLeft: 2,
            "&:hover": {
              color: selectedTab === "buy" ? "white" : "black",
              backgroundColor: selectedTab === "buy" ? "black" : "#d0d0d0",
            },
          }}
        >
          For Sale
        </Button>
        <Button
          onClick={() => handleChange("free")}
          sx={{
            color: selectedTab === "free" ? "white" : "black",
            backgroundColor: selectedTab === "free" ? "black" : "#d0d0d0",
            flex: 1,
            minWidth: 90,
            minHeight: 30,
            textTransform: "capitalize",
            padding: 0,
            borderRadius: 5,
            marginLeft: 2,
            "&:hover": {
              color: selectedTab === "free" ? "white" : "black",
              backgroundColor: selectedTab === "free" ? "black" : "#d0d0d0",
            },
          }}
        >
          free
        </Button>
      </div>
      <Box>
        {/* {list.length &&
          list.map((item) => {
            return <div>item</div>;
          })} */}
      </Box>
    </Box>
  );
};
