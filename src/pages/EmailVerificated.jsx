import React from "react";
import styles from "../css/pagesStyles/EmailVerificated.module.css";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
const EmailVerificated = () => {
  const navigate = useNavigate();
  const { emailSent } = useSelector((state) => state.emailSentRedux);
  const maskedEmail = emailSent.email.replace(
    /^(\w{2})(\w+)(\w{1})@(.*)$/,
    "$1*******$3@$4"
  );

  return (
    <div className="containerCss flex justify-center items-center">
      {emailSent.redirect === false ? (
        navigate("/account/login", { replace: true })
      ) : (
        <div
          className={`w-3/4 -bg--navbarBackground h-56 rounded-xl flex justify-center items-center flex-col boxShadowGreen`}
        >
          <p className="-text--verde text-5xl pb-6">E-mail enviado</p>
          <br />
          <p className="text-2xl text-center p-2">
            Um e-mail foi enviado para {maskedEmail}, verifique-o e então{" "}
            <Link to="/account/login" className="-text--verde ">
              clique aqui
            </Link>{" "}
            para efetuar o login
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailVerificated;
