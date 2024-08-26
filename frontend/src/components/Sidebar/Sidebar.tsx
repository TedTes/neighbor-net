import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import MailIcon from "@mui/icons-material/Mail"; // Messages icon
import NotificationsIcon from "@mui/icons-material/Notifications"; // Notifications icon
import SettingsIcon from "@mui/icons-material/Settings";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ExploreIcon from "@mui/icons-material/Explore";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ForumIcon from "@mui/icons-material/Forum";
import "./Sidebar.styles.css";

type SidebarItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const sidebarItems: SidebarItem[] = [
  {
    name: "Home",
    icon: <HomeIcon sx={{ color: "black", fontSize: 25 }} />,
    path: "/",
  },
  {
    name: "Explore",
    icon: <ExploreIcon sx={{ color: "black", fontSize: 25 }} />,
    path: "/explore",
  },
  {
    name: "Marketplace",
    icon: (
      <LocalOfferIcon color="action" sx={{ color: "black", fontSize: 25 }} />
    ),
    path: "/marketplace",
  },
  {
    name: "Chats",
    icon: <ForumIcon color="action" sx={{ color: "black", fontSize: 25 }} />,
    path: "/chat",
  },
  {
    name: "Add Neighbor",
    icon: <PersonAddIcon sx={{ color: "black", fontSize: 25 }} />,
    path: "/add-neighbour",
  },
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
