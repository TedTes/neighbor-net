import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.styles.css";

type SidebarItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const sidebarItems: SidebarItem[] = [
  {
    name: "News Feed",
    icon: <i className="fas fa-newspaper"></i>,
    path: "/news",
  },
  {
    name: "Events",
    icon: <i className="fas fa-calendar-alt"></i>,
    path: "/events",
  },
  { name: "Groups", icon: <i className="fas fa-users"></i>, path: "/groups" },
  {
    name: "Messages",
    icon: <i className="fas fa-comments"></i>,
    path: "/messages",
  },
  { name: "Settings", icon: <i className="fas fa-cog"></i>, path: "/settings" },
];

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
