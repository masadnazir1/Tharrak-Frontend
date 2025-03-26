import React, { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import Home from "../../assets/home.png";
import Explore from "../../assets/explore.png";
import Add from "../../assets/add.png";
import Friend from "../../assets/friends.png";
import Profile from "../../assets/profile.png";

const menuItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Explore", path: "/explore", icon: Explore },
  { name: "Create", path: "/create", icon: Add },
  { name: "Friends", path: "/friends", icon: Friend },
  { name: "Profile", path: "/profile", icon: Profile },
];

const SideBar = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Home");

  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`${styles.tab} ${
              selected === item.name ? styles.active : ""
            }`}
            onClick={() => {
              setSelected(item.name);
              navigate(item.path);
            }}
          >
            <img src={item.icon} alt={item.name} className={styles.Icon} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className={styles.content}>
        <h2>{selected}</h2>
        <p>
          {selected === "Home" && "Welcome to the Home Page!"}
          {selected === "Explore" && "Discover new content!"}
          {selected === "Create" && "Start creating something amazing!"}
          {selected === "Friends" && "Connect with your friends!"}
          {selected === "Profile" && "View and edit your profile here!"}
        </p>
      </div>
    </div>
  );
};

export default SideBar;
