import React, { useEffect } from "react";
import styles from "../css/pagesStyles/Jogos.module.css";
import PageTitle from "../components/PageTitle";

const Jogos = () => {
  return (
    <div className="containerCss">
      <PageTitle pageTitle="Jogos" />
      <div className={styles.loading}>
        <p>Loading</p>

        <div className={styles.dotsFlow}></div>
      </div>
    </div>
  );
};

export default Jogos;
