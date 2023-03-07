import React from "react";
import styles from "../css/pagesStyles/LoginUser.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { changeIsLogged } from "../redux/isLoggedSlice";
import PageTitle from "../components/PageTitle";
import SwalFire from "../components/SwalFire";
import jwt_decode from "jwt-decode";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import googleSvg from "../img/googleSvg.svg";

const LoginUser = ({}) => {
  const { isDark } = useSelector((state) => state.isDarkRedux);
  const [isChecked, setIsChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const [storageLogado, setStorageLogado] = useState({});

  const dispatch = useDispatch();
  const [dados, setDados] = useState({
    email: "",
    password: "",
  });

  var iframe = document.getElementsByTagName("iframe");
  console.log(iframe[0]);
  // if (iframe[0]) {
  //   iframe[0].body.style.backgroundColor = "red";
  // }

  // var innerDoc = iframe[0].contentDocument || iframe[0].contentWindow.document;
  // innerDoc.body.style.backgroundColor = "red";

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
    SwalFire("Logado!", "success");
  };
  const handdleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handdleKeepLogged = (response) => {
    const novaStorageLogado = {
      name: response.data.name,
      email: response.data.email,
      logado: true,
    };
    setStorageLogado(novaStorageLogado);
    dispatch(changeIsLogged(novaStorageLogado));

    const expire = new Date().getTime() + 1 * 10 * 1000;

    if (isChecked) {
      localStorage.setItem("email", JSON.stringify(novaStorageLogado));
    } else {
      localStorage.setItem("email", JSON.stringify(novaStorageLogado));
    }
    console.log(novaStorageLogado);
    console.log(storageLogado);
  };

  const excluir = () => {
    localStorage.removeItem("email");
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
            // console.log(response);
            // limparDados();
            console.log(response);
            sucesso();
            handdleKeepLogged(response);
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
    console.log(error);
    alert(`O usuário ou senha estão incorretos`);
  };

  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="container">
      <PageTitle pageTitle="Login" />

      <div className={`${styles.loginBox} ${!isDark && styles.loginBoxLight} `}>
        <div className={styles.loginContainer}>
          <h1>Login</h1>
          <form onSubmit={handdleLogin} method="post">
            <div className={styles.box}>
              <div className={styles.userBox}>
                <input
                  type="text"
                  onKeyUp={handleKeypress}
                  value={dados.email}
                  name="email"
                  onChange={onchangeEmail}
                  autoFocus
                  autoComplete="on"
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
                <div className={styles.forgotKeep}>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handdleCheckboxChange}
                      id="checkboxInput"
                    />
                    <label
                      htmlFor="checkboxInput"
                      className={styles.labelCheckbox}
                    >
                      Keep logged in
                    </label>
                  </div>

                  <div className={styles.forgotPassword}>
                    <Link to="/account/recover-password">
                      Forgot your password ?
                    </Link>
                  </div>
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

          <div className={styles.googleButton}>
            <button onClick={() => login()}>
              <img src={googleSvg} alt="" /> Sign in with Google
            </button>
          </div>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse.credential);
              var decoded = jwt_decode(credentialResponse.credential);

              console.log(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
      <button onClick={excluir}>asdasdad</button>
    </div>
  );
};

export default LoginUser;
