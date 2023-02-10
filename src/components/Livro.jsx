import React from "react";
import styles from "../css/componentsStyles/Livro.module.css";
import Button from "./Button";
const Livro = ({ livro, excluirLivro }) => {
  return (
    <div className={styles.container}>
      <div className={styles.p1}>
        <p>{livro.isbn}</p>
      </div>
      <div className={styles.p2}>
        <p>{livro.titulo}</p>
      </div>
      <div className={styles.p3}>
        <p>{livro.autor}</p>
      </div>
      <div className={styles.botao}>
        <Button onClick={() => excluirLivro(livro.id)}>Excluir</Button>
      </div>
    </div>
  );
};

export default Livro;
