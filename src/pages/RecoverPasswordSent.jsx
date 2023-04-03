import React from "react";
import Button from "../components/smallComponents/Button";
import { useSelector, useDispatch } from "react-redux";
import styles from "../css/pagesStyles/RecoverPassword.module.css";

import { useNavigate } from "react-router-dom";
const RecoverPasswordSent = () => {
  const navigate = useNavigate();
  const { recoverPassword } = useSelector(
    (state) => state.recoverPasswordRedux
  );
  console.log(recoverPassword);
  if (recoverPassword.redirect === false) {
    navigate("/account/recover-password", { replace: true });
  }
  return (
    <div className="containerCss flex justify-center items-center relative bottom-2">
      {recoverPassword.redirect === true ? (
        <div
          className={`-bg--navbarBackground flex  items-center flex-col  w-4/5 h-56 ${styles.boxShadow}`}
        >
          <p className="text-3xl p-5 -text--verde">Email enviado</p>
          <p className="text-base text-center p-3">
            Enviamos um email para <strong>email</strong> com um link para você
            poder entrar novamente na sua conta
          </p>
          <div className="flex flex-row justify-center items-center p-3">
            <span className="pr-2">
              <Button
                onClick={() => {
                  navigate("/account/recover-password", { replace: true });
                }}
              >
                Voltar
              </Button>
            </span>
            <Button
              onClick={() => {
                navigate("/account/login", { replace: true });
              }}
            >
              Login
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default RecoverPasswordSent;
