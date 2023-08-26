import React, { useEffect } from "react";
import styles from "../css/pagesStyles/Jogos.module.css";
import PageTitle from "../components/PageTitle";
import { Link } from "react-router-dom";

const Jogos = () => {
  function scrollToMyElement() {
    localStorage.setItem("scroll", true);
  }
  return (
    <div className="containerCss">
      <Link to="/" onClick={scrollToMyElement}>
        Ir para home
      </Link>
      <PageTitle pageTitle="Jogos" />
      <div className={styles.loading}>
        <p>Loading</p>

        <div className={styles.dotsFlow}></div>
      </div>
    </div>
  );
};

export default Jogos;
