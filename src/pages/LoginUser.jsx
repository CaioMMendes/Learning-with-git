import React from "react";
import styles from "../css/pagesStyles/LoginUser.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/Button";
import axios from "axios";

const LoginUser = ({ isDark }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [dados, setDados] = useState({
    email: "",
    password: "",
  });
  const inputRef = useRef(null);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const onchangeEmail = (e) => {
    setDados({ ...dados, email: e.target.value });
  };
  const onchangePassword = (e) => {
    setDados({ ...dados, password: e.target.value });
  };

  const onBlurEmail = () => {
    let trimEmail;
    trimEmail =
      dados.email && dados.email.trim().split(" ").filter(Boolean).join(" ");
    setDados({ ...dados, email: trimEmail });
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      alert("Em construção");
    }
  };
  const limparDados = () => {
    setDados({
      email: "",
      password: "",
    });
  };

  const sucesso = () => {
    Swal.fire({
      customClass: `${styles.swal}`,
      icon: "success",
      title: "Logado!",
      width: 450,
      text: "",
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    });
  };

  const handdleLogin = async (event) => {
    event.preventDefault();

    dados.email != ""
      ? await axios
          .post("http://localhost:3003/login", {
            email: dados.email,
            password: dados.password,
          })
          .then((response) => {
            console.log(response);
            // limparDados();
            sucesso();
          })
          .catch((error) => {
            usuarioSenhaInvalidos(error);
          })
      : alert("Digite um email valido");
    // ? ""
    // : !isValidPhone && alert("Digite um número de telefone válido")
    // ? ""
    // : !isValidCep && alert("Digite um cep valido");
  };
  const usuarioSenhaInvalidos = (error) => {
    alert(`O usuário ou senha estão incorretos`);
  };

  return (
    <div className="container">
      <div className={`${styles.loginBox} ${!isDark && styles.loginBoxLight} `}>
        <h1>Login</h1>
        <form onSubmit={handdleLogin} method="post">
          <div className={styles.box}>
            <div className={styles.userBox}>
              <input
                type="text"
                onKeyUp={handleKeypress}
                value={dados.email}
                onChange={onchangeEmail}
                autoFocus
                onBlur={onBlurEmail}
                required
              />
              <label>
                E-mail <span>*</span>{" "}
              </label>
            </div>

            <div className={styles.userBox}>
              <input
                onKeyUp={handleKeypress}
                className={styles.inputPassword}
                type={`${showPassword ? "text" : "password"}`}
                value={dados.password}
                ref={inputRef}
                onChange={onchangePassword}
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
              <div className={styles.forgotPassword}>
                <Link to="/account/recover-password">
                  Forgot your password ?
                </Link>
              </div>
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
