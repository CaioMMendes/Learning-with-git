import React from "react";
import styles from "../css/pagesStyles/LoginUser.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/smallComponents/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { changeIsLogged } from "../redux/isLoggedSlice";
import PageTitle from "../components/PageTitle";
import { SwalFire } from "../components/SwalFire";
import jwt_decode from "jwt-decode";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import googleSvg from "../img/googleSvg.svg";
import { UserApi } from "../hooks/UserApi";
import { localStorageToken } from "../components/smallComponents/LocalStorage";
import { changeGoogleLogin } from "../redux/GoogleLoginSlice";
import Loading from "../components/Loading";

const LoginUser = ({}) => {
  const navigate = useNavigate();
  const { isDark } = useSelector((state) => state.isDarkRedux);
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const { googleLogin } = useSelector((state) => state.googleLoginRedux);
  const [storageLogado, setStorageLogado] = useState({});
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [dados, setDados] = useState({
    email: "",
    password: "",
  });

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

  // const handleKeypress = (e) => {
  //   //it triggers by pressing the enter key
  //   if (e.keyCode === 13) {
  //   }
  // };
  // const limparDados = () => {
  //   setDados({
  //     email: "",
  //     password: "",
  //   });
  // };

  const sucesso = () => {
    SwalFire("Logado!", "success", 2000, false);
  };
  const handdleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  //porque quando o navigate esta dendo da função handdlelogin da erro?

  const handdleLogin = async (event) => {
    event.preventDefault();
    const api = UserApi();
    setIsLoading(true);
    dados.email != ""
      ? await api
          .login(
            dados.email,
            dados.password,
            isChecked,
            googleLogin.linkAccount,
            googleLogin.googleId,
            googleLogin.picture
          )

          .then((response) => {
            if (response.data.message === "Verifique o e-mail") {
              return alert(response.data.message);
            }
            if (
              response.data.message ===
              "O seu email de confirmação expirou, cadastre novamente para efetuar o login"
            ) {
              return alert(response.data.message);
            }
            if (response.data.invalidUserPassword === true) {
              return alert("Usuário ou senha inválidos");
            }

            dispatch(changeIsLogged({ ...response.data, logado: true }));
            sucesso();
            // handdleKeepLogged(response);

            setIsLoading(false);
            localStorage.setItem("token", JSON.stringify(response.data.token));

            navigate("/account/profile", { replace: true });
          })
          .catch((error) => {
            if (error.response.status == 418) {
              alert("Usuário e/ou senha inválidos");
            } else {
              alert(`Ocorreu um erro no sistema`);
            }
            setIsLoading(false);
          })
      : alert("Digite um email valido");
    setIsLoading(false);
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const api = UserApi();
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        setIsLoading(true);
        await api
          .googleLogin(res.data.email, res.data.sub, isChecked)

          .then((response) => {
            if (response.data.message === "Email já cadastrado") {
              alert(
                `O email ${response.data.email} já está cadastrado, efetue o login dessa conta para linkar o google`
              );
              inputRef.current.focus();
              setDados({ ...dados, email: response.data.email });
              dispatch(
                changeGoogleLogin({
                  ...googleLogin,
                  linkAccount: response.data.email,
                  googleId: res.data.sub,
                  picture: res.data.picture,
                })
              );
              setIsLoading(false);
            } else if (response.data.redirect === true) {
              dispatch(changeGoogleLogin({ ...res.data, disabled: true }));
              return navigate("/account/register", { replace: true });
              setIsLoading(false);
            } else {
              dispatch(changeIsLogged({ ...response.data, logado: true }));
              sucesso();

              localStorage.setItem(
                "token",
                JSON.stringify(response.data.token)
              );
              navigate("/account/profile", { replace: true });
              setIsLoading(false);
            }
          })
          .catch((error) => {
            console.error(error);
            alert(`Ocorreu um erro`);
            setIsLoading(false);
          });

        //todo buscar o email e o googleId
        //todo se ja tiver o googleId cadastrado logar
        //todo se já tiver o email mas não tiver o google id perguntar se ele é o dono da conta e pedir pra logar se for
        //todo se não tiver nenhum dos dois redirecionar para a pagina de cadastro com autocomplete do email
        //todo travado e autocomplete do nome liberado pedindo pra ele colocar a senha
        //enviar os dados, se não for cadastrado,cadastrar, se já for, fazer update dos dados e retornar
        // verificar se o email já esta cadastrado
      } catch (err) {
        setIsLoading(false);
      }
    },
  });
  return (
    <div
      className={`${
        isLoading ? styles.fundoCinza : ""
      } containerCss flex justify-center items-center relative bottom-2`}
    >
      <PageTitle pageTitle="Login" />
      <div className={`${isLoading ? styles.loading : styles.hidden}`}>
        <Loading />
      </div>
      <div className={`${styles.loginBox} ${!isDark && styles.loginBoxLight} `}>
        <div className={styles.loginContainer}>
          <h1>Login</h1>
          <form onSubmit={handdleLogin} method="post">
            <div className={styles.box}>
              <div className={styles.userBox}>
                <input
                  type="text"
                  // onKeyUp={handleKeypress}
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
                  // onKeyUp={handleKeypress}
                  className={`${styles.inputPassword}`}
                  type={`${showPassword ? "text" : "password"}`}
                  value={dados.password}
                  onChange={onchangePassword}
                  autoComplete="off"
                  ref={inputRef}
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

                <div
                  className={`${styles.forgotPassword} cursor-pointer  h-full w-full flex justify-end `}
                >
                  <Link
                    to="/account/recover-password"
                    className="cursor-pointer  h-full z-10"
                  >
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

          <div className={styles.googleButton}>
            <button onClick={() => login()}>
              <img src={googleSvg} alt="" /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
