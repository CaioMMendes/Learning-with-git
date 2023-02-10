import React from "react";
import styles from "../css/pagesStyles/Sobre.module.css";

const Sobre = () => {
  return (
    <div className="container">
      <img
        className={styles.cebolinha}
        src="https://upload.wikimedia.org/wikipedia/pt/9/98/Cebolinha.png"
        alt=""
      />
      <div className={styles.conteudo}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, maxime.
      </div>
    </div>
  );
};

export default Sobre;
