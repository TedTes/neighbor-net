import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ForumIcon from "@mui/icons-material/Forum";
type SidebarItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};
export const sidebarItems: SidebarItem[] = [
  {
    name: "Home",
    icon: <HomeIcon sx={{ color: "#388e3c", fontSize: 25 }} />,
    path: "/feed",
  },
  {
    name: "Explore",
    icon: <ExploreIcon sx={{ color: "#388e3c", fontSize: 25 }} />,
    path: "/explore",
  },
  {
    name: "For Sale & Free",
    icon: (
      <LocalOfferIcon color="action" sx={{ color: "#388e3c", fontSize: 25 }} />
    ),
    path: "/marketplace",
  },
  {
    name: "Chats",
    icon: <ForumIcon color="action" sx={{ color: "#388e3c", fontSize: 25 }} />,
    path: "/chat",
  },
];
