import React from "react";
import styles from "../css/pagesStyles/Jogos.module.css";

const Jogos = () => {
  return (
    <div className="container">
      <div className={styles.loading}>
        <p>Loading</p>
        <div className={styles.dotsFlow}></div>
      </div>
    </div>
  );
};

export default Jogos;
