import React from "react";
import styles from "../css/Button.module.css";

const Itens = ({ itens, excluirLivro }) => {
  return (
    <div>
      <li>
        {itens}{" "}
        <button
          onClick={() => {
            excluirLivro(itens);
          }}
          className={styles.addButton}
        >
          Excluir
        </button>
      </li>
    </div>
  );
};

export default Itens;
