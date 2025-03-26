import React, { useEffect } from "react";
import styles from "../styles/SplashScreen.module.css";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();
  ///

  return (
    <div className={styles.Container}>
      <div className={styles.Child}>
        <div className={styles.Logo}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/4926/4926592.png"
            alt=""
          />
          <strong>Tharrak!</strong>
        </div>
        <h6 className={styles.Tagline}>Let’s Get Tharraked!</h6>
      </div>
    </div>
  );
};

export default SplashScreen;
