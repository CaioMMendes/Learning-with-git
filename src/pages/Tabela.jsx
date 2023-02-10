import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../css/pagesStyles/Tabela.module.css";
import Button from "../components/Button";
import themeContext from "../contexts/ThemeContext";

import { BsSortNumericDown, BsSortNumericUp } from "react-icons/bs";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import Livros from "../components/Livros";
const Home = ({
  livros,
  crescente,
  decrescente,
  crescenteTitulo,
  decrescenteTitulo,
  crescenteAutor,
  decrescenteAutor,
  excluirLivro,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);

  //testando map com index------------
  const livrosMap = ["css", "html", "javaScript", "react", "PHP"];
  let livros1 = livrosMap.map((livro) => {
    return "livro" + livro;
  });
  let livros2 = livrosMap.map((livro, index) => {
    return "livro" + index + " " + livro;
  });
  console.log(livros);
  console.log(livros1);
  console.log(livros2);

  //-----------------------------------

  return (
    <main>
      <div className={styles.tudo}>
        <div className={styles.tabela}>
          <div>
            <h1 className={styles.titulo}>Tabela de Livros</h1>
            <div className={styles.header}>
              <p className={styles.p1}>
                ISBN{" "}
                {isActive ? (
                  <BsSortNumericDown
                    className={styles.sort}
                    title="Organizar"
                    onClick={() => {
                      crescente();
                      setIsActive(!isActive);
                    }}
                  />
                ) : (
                  <BsSortNumericUp
                    className={styles.sort}
                    title="Organizar"
                    onClick={() => {
                      decrescente();
                      setIsActive(!isActive);
                    }}
                  />
                )}
              </p>

              <p className={styles.p2}>
                Títulos{" "}
                {isActive2 ? (
                  <AiOutlineSortAscending
                    className={styles.sort}
                    title="Organizar"
                    onClick={() => {
                      setIsActive2(!isActive2);
                      crescenteTitulo();
                    }}
                  />
                ) : (
                  <AiOutlineSortDescending
                    className={styles.sort}
                    title="Organizar"
                    onClick={() => {
                      setIsActive2(!isActive2);
                      decrescenteTitulo();
                    }}
                  />
                )}
              </p>
              <p className={styles.p3}>
                Autor{" "}
                {isActive3 ? (
                  <AiOutlineSortAscending
                    className={styles.sort}
                    title="Organizar"
                    onClick={() => {
                      setIsActive3(!isActive3);
                      crescenteAutor();
                    }}
                  />
                ) : (
                  <AiOutlineSortDescending
                    className={styles.sort}
                    title="Organizar"
                    onClick={() => {
                      setIsActive3(!isActive3);
                      decrescenteAutor();
                    }}
                  />
                )}
              </p>
              <Link to="/cadastro">
                <Button className={styles.vazio}>Cadastrar</Button>
              </Link>
            </div>
            <div className="livros">
              <Livros livros={livros} excluirLivro={excluirLivro} />
            </div>
          </div>
          <div
            className={styles.footer}
            style={
              livros.length % 2 == 0
                ? { background: "rgb(216, 216, 216)" }
                : { background: "rgb(247, 247, 247)" }
            }
          >
            <p>Quantidade de livros na tabela: {livros.length}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
