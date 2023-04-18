import React, { useCallback } from "react";
import { useState, useRef } from "react";
import styles from "../css/pagesStyles/Cadastro.module.css";
import { Link } from "react-router-dom";
import Button from "../components/smallComponents/Button";
import Swal from "sweetalert2";
import { IoIosArrowBack } from "react-icons/io";
import PageTitle from "../components/PageTitle";

const Cadastro = ({ cadastrarLivro }) => {
  const success = () => {
    inputData.length == 0
      ? Swal.fire("Preencha todas as informações", "", "error")
      : Swal.fire("Cadastrado!", "", "success");
  };

  const temporizador = () => {
    inputData.length == 0 ||
    inputDataAutor.length == 0 ||
    inputDataTitulo.length == 0
      ? Swal.fire({
          customClass: `${styles.swal}`,
          icon: "error",

          padding: 0,
          width: 450,
          text: `Os seguintes campos estão em branco: ${
            inputData.length == 0 ? "ISBN " : ""
          } ${inputDataTitulo.length == 0 ? "Título " : ""} ${
            inputDataAutor.length == 0 ? "Autor " : ""
          }  `,
          timer: 3000,
          showCancelButton: false,

          buttons: {
            confirm: '{ text: "aa" }',
          },

          showConfirmButton: true,
          confirmButtonColor: "#333",

          backdrop: `
    url("https://gifs.eco.br/wp-content/uploads/2022/05/gifs-triste-para-whatsapp-2.gif")
    left top
    no-repeat
  `,
        })
      : Swal.fire({
          customClass: `${styles.swal}`,
          icon: "success",
          title: "Cadastrado!",
          width: 450,
          text: "",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,

          backdrop: `

    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
  `,
        });
  };

  const buttonAddLivro = () => {
    inputData.length == 0 ||
    inputDataAutor.length == 0 ||
    inputDataTitulo.length == 0
      ? {}
      : (cadastrarLivro(inputData, inputDataTitulo, inputDataAutor),
        setInputData(""),
        setInputDataTitulo(""),
        setInputDataAutor(""));
  };

  const [inputData, setInputData] = useState([]);
  const inputChange = (e) => {
    setInputData(e.target.value);
  };

  const [inputDataTitulo, setInputDataTitulo] = useState([]);
  const inputChangeTitulo = (e) => {
    setInputDataTitulo(e.target.value);
  };

  const [inputDataAutor, setInputDataAutor] = useState([]);
  const inputChangeAutor = (e) => {
    setInputDataAutor(e.target.value);
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      buttonAddLivro();
      temporizador();
      inputFocus();
    }
  };

  const focusRef = useRef(null);
  const inputFocus = useCallback(() => {
    focusRef.current?.focus();
  }, []);

  return (
    <div className="containerCss">
      <PageTitle pageTitle="Cadastro" />
      <div className={styles.tudo}>
        <div className={styles.content}>
          <div id="cadastro" className={styles.cadastro}>
            <form>
              <Link to="/Tabela">
                <IoIosArrowBack
                  aria-label="Voltar"
                  title="Voltar"
                  className={styles.voltar}
                />
              </Link>

              <h1>Cadastro</h1>

              <p className={styles.p}>
                <label className={styles.label}>
                  ISBN
                  <input
                    className={styles.input}
                    required="required"
                    type="number"
                    onChange={inputChange}
                    onKeyUp={handleKeypress}
                    value={inputData}
                    placeholder="9788575225127"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 13))
                    }
                    autoFocus
                    ref={focusRef}
                    autoComplete="off"
                  />
                </label>
              </p>

              <p className={styles.p}>
                <label className={styles.label}>
                  Título
                  <input
                    className={styles.input}
                    required="required"
                    type="text"
                    onChange={inputChangeTitulo}
                    onKeyUp={handleKeypress}
                    value={inputDataTitulo}
                    placeholder="Aprendendo Material Design"
                    autoComplete="on"
                  />
                </label>
              </p>

              <p className={styles.p}>
                <label className={styles.label}>
                  Autor
                  <input
                    className={styles.input}
                    required="required"
                    type="text"
                    placeholder="Kyle Mew"
                    onKeyUp={handleKeypress}
                    onChange={inputChangeAutor}
                    value={inputDataAutor}
                  />
                </label>
              </p>
            </form>
            <div className={styles.botao}>
              <Button
                onClick={() => {
                  buttonAddLivro();
                  temporizador();
                  inputFocus();
                }}
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Cadastro;
