import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.styles.css";
import { sidebarItems } from "../../utils";

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
    </div>
  );
};
