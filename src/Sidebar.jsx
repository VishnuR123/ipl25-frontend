import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
// import myicon from "./assets/t20-logo.svg";
// import myicon from "./assets/IPL.svg";
import myicon from "./assets/IPL-white.png";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import HistoryIcon from "@mui/icons-material/History";
import PublicIcon from "@mui/icons-material/Public";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import UpdateIcon from '@mui/icons-material/Update';
const navItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "Player Page", icon: <PersonIcon />, path: "/players" },
  { text: "Owner Page", icon: <BusinessIcon />, path: "/owners" },
  { text: "Past Results", icon: <HistoryIcon />, path: "/past-results" },
  { text: "Country Page", icon: <PublicIcon />, path: "/country" },
];

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <nav>
        <div className="nav-header">
          <img src={myicon} alt="sd" className="avatar" />
          <br />
          <br />
          <h2 className="nav-title">POINTS DASHBOARD</h2>
        </div>
        <ul>
          <li onClick={toggleSidebar} >
            <HomeIcon sx={{ fontSize: 23 }} />
            <Link to="/" className="custom-link">Home</Link>
          </li>
          <li onClick={toggleSidebar}>
            <PersonIcon sx={{ fontSize: 23 }} />
            <Link to="/owners" className="custom-link">Owner Page</Link>
          </li>
          <li onClick={toggleSidebar}>
            <SportsCricketIcon sx={{ fontSize: 23 }} />
            <Link to="/players" className="custom-link">Player Page</Link>
          </li>
          <li onClick={toggleSidebar}>
            <PublicIcon sx={{ fontSize: 23 }} />
            <Link to="/country" className="custom-link">Team Lineup</Link>
          </li>
          <li onClick={toggleSidebar}>
            <AutoAwesomeIcon sx={{ fontSize: 23 }} /> 
            <Link to="/cvc" className="custom-link">C/VC List</Link>
          </li>
          <li onClick={toggleSidebar}>
            <HistoryIcon sx={{ fontSize: 23 }} />
            <Link to="/past-results" className="custom-link">Past Results</Link>
          </li>
          <li onClick={toggleSidebar}>
            <UpdateIcon sx={{ fontSize: 23 }} />
            <Link to="/predictions" className="custom-link">Predictions</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
