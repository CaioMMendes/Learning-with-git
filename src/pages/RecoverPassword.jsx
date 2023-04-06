import React from "react";

import styles from "../css/pagesStyles/RecoverPassword.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/smallComponents/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { changeIsLogged } from "../redux/isLoggedSlice";
import PageTitle from "../components/PageTitle";
import { SwalFire, SwalFireConfirm } from "../components/SwalFire";
import jwt_decode from "jwt-decode";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import googleSvg from "../img/googleSvg.svg";
import { UserApi } from "../hooks/UserApi";
import { localStorageToken } from "../components/smallComponents/LocalStorage";
import { changeGoogleLogin } from "../redux/GoogleLoginSlice";
import Loading from "../components/Loading";
import { GiPadlock } from "react-icons/gi";
import { changeRecoverPassword } from "../redux/RecoverPasswordSlice";

const RecoverPassword = ({}) => {
  const { isDark } = useSelector((state) => state.isDarkRedux);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const { googleLogin } = useSelector((state) => state.googleLoginRedux);

  const dispatch = useDispatch();
  const [dados, setDados] = useState({
    email: "",
    password: "",
  });

  const onchangeEmail = (e) => {
    setDados({ ...dados, email: e.target.value });
  };

  const onBlurEmail = () => {
    let trimEmail;
    trimEmail =
      dados.email && dados.email.trim().split(" ").filter(Boolean).join(" ");
    setDados({ ...dados, email: trimEmail });
  };

  const sucesso = () => {
    SwalFire("Sent", "success", 2000, false);
  };
  const erro = () => {
    SwalFire("Email not found", "error", 2000, false);
  };

  const handdleRecoverPassword = async (event) => {
    event.preventDefault();
    const api = UserApi();
    setIsLoading(true);
    await api
      .recoverPassword(dados.email)
      .then((response) => {
        console.log(response.data);
        if (response.data?.message === "E-mail not found") {
          erro();
        } else {
          sucesso();
          dispatch(
            changeRecoverPassword({ email: dados.email, redirect: true })
          );
          navigate("/account/recover-password/sent", { replace: true });
        }

        // handdleKeepLogged(response);
        setIsLoading(false);
        console.log(response);
        console.log("first");
      })
      .catch((error) => {
        console.error(error);

        setIsLoading(false);
      });
  };

  return (
    <div
      className={`${
        isLoading ? styles.fundoCinza : ""
      } containerCss flex justify-center items-center relative bottom-2`}
    >
      <PageTitle pageTitle="Recover Password" />
      <div className={`${isLoading ? styles.loading : styles.hidden}`}>
        <Loading />
      </div>
      <div
        className={`${styles.loginBox} ${!isDark && styles.loginBoxLight}  `}
      >
        <div className={styles.loginContainer}>
          <div className="flex justify-center items-center flex-col mb-6">
            <div>
              <GiPadlock className="text-9xl flex justify-center items-center " />
            </div>
            <p className="text-2xl flex justify-center items-center -text--verde">
              Problems to login?
            </p>
            <p className="text-xl flex justify-center items-center text-center">
              Enter your email and we'll send you a link to get back into your
              account.
            </p>
          </div>
          <form onSubmit={handdleRecoverPassword} method="post">
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
            </div>
            <div className={`${styles.buttonForm} mb-2`}>
              <button
                type="submit"
                className={`${styles.submit} flex justify-start items-center`}
              >
                Submit
              </button>
              {/* <Button>Submits</Button> */}
              <div className={` text-2xl flex flex-col mx-auto w-3/5 text-end`}>
                <p className="text-base">Back to login?</p>

                <Link
                  to="/account/login"
                  className="text-xl leading-normal flex justify-end mx-auto mr-0 -text--verde"
                >
                  <span className="bg-(--verde)">Login</span>
                </Link>
              </div>
            </div>
          </form>

          {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse.credential);
              var decoded = jwt_decode(credentialResponse.credential);

              console.log(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
