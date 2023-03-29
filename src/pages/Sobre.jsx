import React from "react";
import styles from "../css/pagesStyles/Sobre.module.css";
import { useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";

const Sobre = () => {
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  return (
    <div className="containerCss">
      <PageTitle pageTitle="Sobre" />

      {isLogged.logado && <p>logado</p>}
      <h1 className="text-3xl font-bold underline bg-blue-700">Hello world!</h1>
      <img
        className={styles.cebolinha}
        src="https://upload.wikimedia.org/wikipedia/pt/9/98/Cebolinha.png"
        alt=""
      />
      <img
        className={styles.zeGotinha}
        src="https://cdn.discordapp.com/attachments/958946333027348510/1074855323313131610/latest.png"
        alt="aaaaaaaaaaaa"
      />
      <div className={styles.conteudo}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, maxime.
      </div>
      <div className={styles.a}>
        <img
          src="https://upload.wikimedia.org/wikipedia/pt/9/98/Cebolinha.png"
          alt="Imagem"
        />
      </div>
    </div>
  );
};

export default Sobre;
