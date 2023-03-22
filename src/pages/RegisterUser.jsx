import React from "react";
import { useState, useEffect } from "react";
import styles from "../css/pagesStyles/RegisterUser.module.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import validator from "validator";
import PageTitle from "../components/PageTitle";
import { UserApi } from "../hooks/UserApi";
import UploadUserImg from "../components/upload/UploadUserImg";
import { dataURItoFile } from "../components/smallComponents/Base64ToFile";
import { numberGenerator } from "../components/smallComponents/NumberGenerator";
import { changeAvatarImage } from "../redux/avatarImage";
import { useSelector, useDispatch } from "react-redux";
// const imageFile = dataURItoFile(img, `${numbers}`);
const RegisterUser = ({ isDark }) => {
  window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    event.returnValue = "";
  });

  const dispatch = useDispatch();
  const { image } = useSelector((state) => state.avatarImageRedux);
  const [imagem, setImagem] = useState();

  useEffect(() => {
    setImagem(image);
    dispatch(changeAvatarImage(""));
  }, []);

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
  const redirect = () => {
    navigate("/account/login");
  };

  const handdleRegister = async (event) => {
    event.preventDefault();
    const api = UserApi();

    const number = numberGenerator();
    console.log(image);
    const imageFile = dataURItoFile(image, `${number}`);

    if (dados.password != dados.confirmPassword) {
      return alert("As senhas estão diferentes");
    } else if (dados.email != "") {
      // await axios
      //   .post("http://localhost:3003/register", {
      //     email: dados.email,
      //     password: dados.password,
      //     name: dados.name,
      //   })

      await api
        .register(dados.email, dados.password, dados.name)
        .then((response) => {
          const userId = response.data;

          console.log(userId);
          sucesso(), redirect();
          if (imageFile != "" && imageFile != undefined) {
            console.log(imageFile);
            console.log(imageFile instanceof File);

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
                  className={dados.email ? styles.emailInput : ""}
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
