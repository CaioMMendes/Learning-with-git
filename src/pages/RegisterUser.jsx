import React from "react";
import { useState } from "react";
import styles from "../css/pagesStyles/RegisterUser.module.css";
import { Link } from "react-router-dom";
import { object } from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";
import validator from "validator";
const RegisterUser = ({ isDark }) => {
  const [dados, setDados] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const onchangeEmail = (e) => {
    if (
      e.target.value === "" ||
      (validator.isEmail(e.target.value) && e.target.value.length <= 100)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setDados({ ...dados, email: e.target.value });
  };
  const onchangeName = (e) => {
    setDados({ ...dados, name: e.target.value });
  };
  const onchangePassword = (e) => {
    let password = e.target.value.replace(/\s+/g, "");

    setDados({ ...dados, password: password });
  };
  const onchangeConfirmPassword = (e) => {
    let confirmPassword = e.target.value.replace(/\s+/g, "");
    setDados({ ...dados, confirmPassword });
  };

  const onBlurEmail = () => {
    let trimEmail;
    trimEmail =
      dados.email && dados.email.trim().split(" ").filter(Boolean).join(" ");
    setDados({ ...dados, email: trimEmail });
  };
  const onBlurName = () => {
    let trimName;
    trimName =
      dados.name && dados.name.trim().split(" ").filter(Boolean).join(" ");
    setDados({ ...dados, name: trimName });
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handdleRegister();
    }
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handdleRegister = async (event) => {
    event.preventDefault();
    if (dados.password != dados.confirmPassword) {
      return alert("As senhas estão diferentes");
    } else if (dados.email != "") {
      await axios
        .post("http://localhost:3003/register", {
          email: dados.email,
          password: dados.password,
          name: dados.name,
        })
        .then((response) => {
          console.log(response);
          // limparDados();
          sucesso();
        })
        .catch((error) => {
          usernameJaCadastrado(error);
        });
    }
  };
  const usernameJaCadastrado = (error) => {
    alert(`O usuário ${error.response.data.email} já está cadastrado`);
  };

  const sucesso = () => {
    Swal.fire({
      customClass: `${styles.swal}`,
      icon: "success",
      title: "Cadastrado!",
      width: 450,
      text: "",
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    });
  };
  return (
    <div className="container">
      <div className={`${styles.loginBox} ${!isDark && styles.loginBoxLight} `}>
        <div className={styles.registerContainer}>
          <h1>Register</h1>
          <form onSubmit={handdleRegister} method="post">
            <div className={styles.box}>
              <div className={styles.userBox}>
                <input
                  type="text"
                  onKeyUp={handleKeypress}
                  autoFocus
                  value={dados.name}
                  onChange={onchangeName}
                  onBlur={onBlurName}
                  required
                />
                <label>
                  Name <span>*</span>
                </label>
              </div>
              <div className={styles.userBox}>
                <input
                  type="text"
                  onKeyUp={handleKeypress}
                  value={dados.email}
                  onChange={onchangeEmail}
                  onBlur={onBlurEmail}
                  required
                />
                <label>
                  E-mail <span>*</span>
                </label>
                {!isValid && (
                  <div className={styles.emailInvalido}>
                    <p>Invalid e-mail</p>
                  </div>
                )}
              </div>

              <div className={styles.userBox}>
                <input
                  //todo metodo para colocar 2 classes styles
                  // className={`${
                  //   showPassword ? `${styles.inputPassword} ${styles.a}` : ""
                  // }`}
                  className={styles.inputPassword}
                  type={`${showPassword ? "text" : "password"}`}
                  onKeyUp={handleKeypress}
                  value={dados.password}
                  onChange={onchangePassword}
                  required
                />
                <label>
                  {" "}
                  Password <span>*</span>
                </label>
                <div
                  className={`${showPassword && `${styles.hide} `} ${
                    styles.show
                  }`}
                  onClick={togglePassword}
                ></div>
              </div>
              <div className={styles.userBox}>
                <input
                  className={styles.inputPassword}
                  type={`${showPasswordConfirm ? "text" : "password"}`}
                  onKeyUp={handleKeypress}
                  value={dados.confirmPassword}
                  onChange={onchangeConfirmPassword}
                  required
                />
                <label>
                  {" "}
                  Confirm password <span>*</span>{" "}
                </label>
                <div
                  className={`${showPasswordConfirm && `${styles.hide} `} ${
                    styles.show
                  }`}
                  onClick={togglePasswordConfirm}
                ></div>
              </div>
            </div>
            <div className={styles.buttonForm}>
              <button type="submit" className={styles.submit}>
                Submit
              </button>

              <div className={styles.register}>
                <p>Have an account?</p>
                <Link to="/account/login">Sign in</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
