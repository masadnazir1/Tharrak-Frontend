import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import HomeIcon from "../../assets/home.png";
import ExploreIcon from "../../assets/explore.png";
import AddIcon from "../../assets/add.png";
import FriendsIcon from "../../assets/friends.png";
import ProfileIcon from "../../assets/profile.png";
import meeter from "../../assets/meeter.png";

const menuItems = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "Explore", path: "/explore", icon: ExploreIcon },
  { name: "Create", path: "/create", icon: AddIcon },
  { name: "Friends", path: "/friends", icon: FriendsIcon },
  { name: "Profile", path: "/profile", icon: ProfileIcon },
];

const menuItemsSidebar = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "Explore", path: "/explore", icon: ExploreIcon },
  { name: "Create", path: "/CreateDeskTop", icon: AddIcon },
  { name: "Friends", path: "/friends", icon: FriendsIcon },
  { name: "Profile", path: "/profile", icon: ProfileIcon },
  { name: "Dashboard", path: "/Dashboard", icon: meeter },
];

//CreateDeskTop

const Layout = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Home");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Sidebar (Only for Desktop) */}
      {!isMobile && (
        <div className={styles.sidebar}>
          {menuItemsSidebar.map((item) => (
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
              <img src={item.icon} alt={item.name} className={styles.icon} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className={styles.content}>
        <Outlet /> {/* Correctly renders pages here */}
      </div>

      {/* Bottom Navigation (For Mobile) */}
      {isMobile && (
        <div className={styles.bottomNav}>
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`${styles.navItem} ${
                selected === item.name ? styles.active : ""
              }`}
              onClick={() => {
                setSelected(item.name);
                navigate(item.path);
              }}
            >
              <img src={item.icon} alt={item.name} className={styles.navIcon} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Layout;
