import React from "react";
import styles from "../css/Footer.module.css";
import { BsGithub, BsFacebook, BsInstagram } from "react-icons/bs";

const Footer = ({ isDark }) => {
  return (
    <footer className={` dark`}>
      <div className={styles.contato}>
        <p>Contatos:</p>
        <div className={styles.media}>
          <a href="https://github.com/CaioMMendes" target="_blank">
            <BsGithub />
          </a>
          <a href="https://www.facebook.com/CaioMendes13" target="_blank">
            <BsFacebook />
          </a>
          <a href="https://www.instagram.com/caiiommr/" target="_blank">
            <BsInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
