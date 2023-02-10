import React from "react";
import styles from "../css/pagesStyles/Animation.module.css";

const OutroEstilo = () => {
  return (
    <div className="container">
      <div className={styles.video}>
        <div className={styles.videoArea}>
          <div className={styles.holdsIframe}>
            <iframe
              width="853"
              height="480"
              src="https://www.youtube.com/embed/5h4vMtBlQQU"
              title="PROJETO DE REACT E SASS PARA O SEU PORTFÓLIO - INTEGRAÇÃO DE REACT COM SASS"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <p>Rodando</p>
    </div>
  );
};

export default OutroEstilo;
