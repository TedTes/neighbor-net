import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.styles.css";
import { sidebarItems } from "../../utils";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar-container">
      <nav className="sidebar-nav">
        {sidebarItems.map((item) => (
          <NavLink key={item.name} to={item.path} className="sidebar-item">
            <div className="sidebar-icon">{item.icon}</div>
            <span className="sidebar-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <Button
        color="inherit"
        startIcon={<AddIcon sx={{}} />}
        onClick={() => alert("hello")}
        sx={{
          backgroundColor: "#388e3c",
          width: "180px",
          borderRadius: "40px",
          color: "#fafafa",
          marginTop: "3em",
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "3.5em",
          "& .MuiButton-startIcon": {
            margin: 0,
          },
          "&:hover": {
            backgroundColor: "#388e3c",
            transform: "scale(1.05)",
            transition: "background-color 0.3s, transform 0.3s",
          },
        }}
      >
        <span>post</span>
      </Button>
    </div>
  );
};
