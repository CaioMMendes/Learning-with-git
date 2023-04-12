import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "../css/pagesStyles/RegisterUser.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import validator from "validator";
import PageTitle from "../components/PageTitle";
import { UserApi } from "../hooks/UserApi";
import UploadUserImg from "../components/upload/UploadUserImg";
import { dataURItoFile } from "../components/smallComponents/Base64ToFile";
import { numberGenerator } from "../components/smallComponents/NumberGenerator";
import { changeAvatarImage } from "../redux/avatarImage";
import { useSelector, useDispatch } from "react-redux";
import { changeGoogleLogin } from "../redux/GoogleLoginSlice";
import { changeIsLogged } from "../redux/isLoggedSlice";
import { changeEmailSent } from "../redux/EmailSentSlice";

// const imageFile = dataURItoFile(img, `${numbers}`);
const RegisterUser = ({ isDark }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const inputRef = useRef(null);
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const { image } = useSelector((state) => state.avatarImageRedux);
  const { googleLogin } = useSelector((state) => state.googleLoginRedux);
  const [imagem, setImagem] = useState();

  const [dados, setDados] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [userId, setUserId] = useState();
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const beforeUnloadCallback = function (event) {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    setImagem(image);
    dispatch(changeAvatarImage(""));

    focusPassword();
    // if (dados.email && location.pathname === "/account/register" ) {
    if (googleLogin.email) {
      setDados({ ...dados, email: googleLogin.email, name: googleLogin.name });
      window.addEventListener("beforeunload", beforeUnloadCallback);
    } else {
      window.removeEventListener("beforeunload", beforeUnloadCallback);
    }
    // if (googleLogin != "") {
    //       window.addEventListener("beforeunload", beforeUnloadCallback);
    // } else {
    //   window.removeEventListener("beforeunload", beforeUnloadCallback);
    // }
  }, []);
  const focusPassword = () => {
    if (googleLogin.name) {
      inputRef.current.focus();
    }
  };
  // useEffect(() => {
  //   focusPassword();
  // }, []);

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
    trimEmail = dados.email && dados.email.replace(/\s/g, "");
    setDados({ ...dados, email: trimEmail });
  };
  const onBlurName = () => {
    let trimName;
    trimName =
      dados.name && dados.name.trim().split(" ").filter(Boolean).join(" ");
    setDados({ ...dados, name: trimName });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  const navigate = useNavigate();
  const redirect = (email) => {
    dispatch(changeEmailSent({ email: email, redirect: true }));
    //todo colocar na pagina criada para quando o redirect for true aceitar e quando for
    //todo false mudar pra outra tela
    navigate("/account/register/email-verificated");
    //todo mudar aqui o navigate
  };

  const handdleRegister = async (event) => {
    event.preventDefault();
    const api = UserApi();

    const number = numberGenerator();

    const imageFile = dataURItoFile(image, `${number}`);

    if (dados.password != dados.confirmPassword) {
      return alert("As senhas estão diferentes");
    } else if (dados.email != "" && dados.name != null) {
      // await axios
      //   .post("http://localhost:3003/register", {
      //     email: dados.email,
      //     password: dados.password,
      //     name: dados.name,
      //   })
      if (googleLogin.email && googleLogin.name != null) {
        console.log(isLogged);
        await api
          .register(
            googleLogin.email,
            dados.password,
            dados.name,
            isLogged.logado,
            googleLogin.sub,
            googleLogin.picture
          )
          .then((response) => {
            const userId = response.data;

            // redirect();
            if (imageFile != "" && imageFile != undefined) {
              api
                // .avatar(imageFile, userId)
                .avatar(imageFile, userId)
                .then((response) => {
                  api
                    .login(googleLogin.email, dados.password, true)
                    .then((response) => {
                      sucesso();
                      navigate("/account/profile");

                      dispatch(
                        changeIsLogged({ ...response.data, logado: true })
                      );
                      dispatch(changeGoogleLogin(""));
                      localStorage.setItem(
                        "token",
                        JSON.stringify(response.data.token)
                      );
                      window.removeEventListener(
                        "beforeunload",
                        beforeUnloadCallback
                      );
                    })

                    .catch((error) => {
                      console.log(error);
                    });
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              api
                .login(googleLogin.email, dados.password, true)
                .then((response) => {
                  sucesso();
                  navigate("/account/profile");
                  console.log(response.data);
                  dispatch(changeIsLogged({ ...response.data, logado: true }));
                  dispatch(changeGoogleLogin(""));
                  localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.token)
                  );
                  window.removeEventListener(
                    "beforeunload",
                    beforeUnloadCallback
                  );
                })

                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await api
          .register(dados.email, dados.password, dados.name, isLogged.logado)
          .then((response) => {
            const userId = response.data;

            sucessoEnvioEmail(), redirect(dados.email);
            if (imageFile != "" && imageFile != undefined) {
              api
                // .avatar(imageFile, userId)
                .avatar(imageFile, userId)
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            alert(`O usuário ${error.response.data.email} já está cadastrado`);
            console.log(error);
          });
      }
    }
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
  const sucessoEnvioEmail = () => {
    Swal.fire({
      customClass: `${styles.swal}`,
      icon: "success",
      title: "Email Enviado!",
      width: 450,
      text: "",
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    });
  };
  //todo como fazer await de duas coisas ao mesmo tempo
  // async function loadData(){
  //   const [products,categories]=Promise.allSettled([loadProducts(),loadCategories()])
  //   return{products,categories}
  // }
  return (
    <div className="containerCss">
      <PageTitle pageTitle="Register" />
      <div className={`${styles.loginBox} ${!isDark && styles.loginBoxLight} `}>
        <div className={styles.registerContainer}>
          <h1>Register</h1>
          <div className={styles.userImage}>
            <UploadUserImg />
          </div>

          <form onSubmit={handdleRegister} method="post">
            <div className={styles.box}>
              <div className={styles.userBox}>
                <input
                  type="text"
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
                  type="email"
                  name="email"
                  value={dados.email}
                  autoComplete="on"
                  onChange={onchangeEmail}
                  onBlur={onBlurEmail}
                  disabled={googleLogin.disabled}
                  className={`${dados.email ? styles.emailInput : ""} ${
                    googleLogin.disabled ? styles.emailDisabled : ""
                  }`}
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
                  value={dados.password}
                  onChange={onchangePassword}
                  ref={inputRef}
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
