import React from "react";
import AllPosts from "../components/PostsCard/Card";
import styles from "../styles/Profile.module.css";

const HomePage = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Child}>
        <AllPosts />
      </div>
    </div>
  );
};

export default HomePage;
