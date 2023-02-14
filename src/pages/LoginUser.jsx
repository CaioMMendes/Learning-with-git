import React from "react";
import styles from "../css/pagesStyles/LoginUser.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/Button";

const LoginUser = ({ isDark }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handdleLogin = (event) => {
    event.preventDefault();
  };
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
      alert("Em construção");
    }
  };

  const focusRef = useRef(null);
  const inputFocus = useCallback(() => {
    focusRef.current?.focus();
  }, []);

  return (
    <div className="container">
      <div className={`${styles.loginBox} ${!isDark && styles.loginBoxLight} `}>
        <h1>Login</h1>
        <form onSubmit={handdleLogin} method="post">
          <div className={styles.box}>
            <div className={styles.userBox}>
              <input type="text" onKeyUp={handleKeypress} required />
              <label>
                Username <span>*</span>{" "}
              </label>
            </div>

            <div className={styles.userBox}>
              <input
                onKeyUp={handleKeypress}
                className={styles.inputPassword}
                type={`${showPassword ? "text" : "password"}`}
                required
              />

              <label>
                {" "}
                Password <span>*</span>{" "}
              </label>
              <div
                className={`${showPassword && `${styles.hide} `} ${
                  styles.show
                }`}
                onClick={togglePassword}
              ></div>
            </div>
          </div>
          <div className={styles.buttonForm}>
            <button type="submit" className={styles.submit}>
              Submit
            </button>
            {/* <Button>Submits</Button> */}
            <div className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/account/register">Register</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
