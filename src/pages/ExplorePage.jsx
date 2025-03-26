import React from "react";
import Trendings from "../components/PostsCard/Trendings";
import styles from "../styles/Profile.module.css";

const ExplorePage = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Child}>
        <h4>Trending</h4>
        <Trendings />
      </div>
    </div>
  );
};

export default ExplorePage;
